import { useState } from "react";
import PropTypes from 'prop-types'
import style from './searchForm.module.css'

const SearchForm = ({ onSubmit }) => {
    const [q, setQ] = useState('');
    const handleChange = ({ target }) => {
        const { value } = target;
        setQ(value);
    }
    const handleSubmit = event => {
        event.preventDefault();
        onSubmit({ q })
        setQ('');;
    }
    return (
        <form className={style.form} onSubmit={handleSubmit}>
            <button type="submit" className={style.button}>
                <span className={style.search}></span>
            </button>

            <input
                onChange={handleChange}
                className={style.input}
                type="text"
                name="q"
                value={q}
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                required
            />
        </form>
    )
}

SearchForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
}

export default SearchForm;