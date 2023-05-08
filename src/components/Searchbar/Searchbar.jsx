import { useState } from 'react';
import css from './Searchbar.module.css'

export const Searchbar = ({createRequest}) => {
  const [inputValue, setInputValue] = useState("");

    const handleChange = ({ target }) => {
        setInputValue (target.value);
    }
    const onSubmit = (e) => {
        e.preventDefault();
        createRequest({ inputValue: inputValue });
        setInputValue('');
}
        return (
          <header className={css.searchbar}>
            <form className={css.SearchForm} onSubmit={onSubmit}>
              <button type="submit" className={css.SearchFormButton}>
                <span className="button-label">Search</span>
              </button>
              <input
                className={css.SearchFormInput}
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                onChange={handleChange}
                value={inputValue}
              />
            </form>
          </header>
        );
}
