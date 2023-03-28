import React from 'react';
import css from './Searchbar.module.css';
import { toast } from 'react-toastify';
import propTypes from 'prop-types';
import { useState } from 'react';

const Searchbar = ({ query, onFormSubmit }) => {
  const [value, setValue] = useState('');

  const handleChange = event => {
    setValue(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    const val = value;

    if (val.trim() !== '' && query !== value) {
      onFormSubmit(value);
    } else if (value.trim() === '') {
      toast.info('Please enter any query', {
        position: 'top-right',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: 'light',
      });
      return;
    }
  };

  return (
    <header className={css.searchbar}>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.searchFormButton}>
          <span className={css.searchFormButtonLabel}>Search</span>
        </button>

        <input
          className={css.searchFormInput}
          value={value}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  handleChange: propTypes.func,
  handleSubmit: propTypes.func,
};
