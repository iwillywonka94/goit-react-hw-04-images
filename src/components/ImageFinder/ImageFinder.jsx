import { useEffect, useState } from "react";

import SearchForm from "./SearchBar/SearchForm";
import SearchBar from "./SearchBar";
import ImageGallery from "./ImageGallery";
import Button from "../Button";
import Loader from "../Loader";
import Modal from "../Modal";

import style from "./imageFinder.module.css"

import { searchImages } from '../../services/api-services'

function ImageFinder() {
    // UseState
    const [images, setImages] = useState({
        items: [],
        loading: false,
        error: null,
    });
    const [modal, setModal] = useState({
        isModal: false,
        modalBody: {}
    })
    const [q, setQ] = useState('');
    const [page, setPage] = useState(1);


    // UseEffect
    useEffect(() => {
        const getImages = async () => {
            if (!q) {
                return
            };
            setImages(prevState => ({
                ...prevState,
                loading: true,
                error: null,
            }));
            try {
                const items = await searchImages(q, page);
                setImages(prevState => ({
                    ...prevState,
                    items: [...prevState.items, ...items],
                    loading: false,
                }))
            } catch (error) {
                setImages({
                    loading: false,
                    error: error.message,
                })
            }
        };
        if (q !== '') {
            getImages()
        }
    }, [q, page]);

    const setSearch = ({ q }) => {
        setQ(q);
        setPage(1);
        setImages({
            ...images,
            items: [],
        })
    };

    const loadMore = () => {
        setPage(prevPage => prevPage + 1)
    };

    const showModal = (modalBody) => {
        setModal({
            isModal: true,
            modalBody,
        })
    };

    const closeModal = () => {
        setModal({
            isModal: false,
        })
    };

    const {items, loading} = images;
    const {modalBody, isModal} = modal;

    return (
        <>
            <SearchBar>
                < SearchForm onSubmit={setSearch} />
            </SearchBar>
            {loading && <Loader />}
            {Boolean(items.length) && <ImageGallery items={items} onClick={showModal} />}
            {Boolean(items.length) && <div className={style.button}>< Button onClick={loadMore} text={"Load More"} /></div>}
            {isModal &&
                <Modal close={closeModal}>
                    <img
                        src={modalBody.modalUrl}
                        alt={modalBody.tags}
                    />
                </Modal>}
        </>
    )
}

export default ImageFinder;