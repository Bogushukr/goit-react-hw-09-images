import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Searchbar.module.css';

export default function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const updateQuery = ({ currentTarget: { value } }) => {
    setQuery(value);
  };

  const onSubmitHandler = event => {
    event.preventDefault();
    onSubmit(query);
  };

  return (
    <header className={styles.Searchbar}>
      <form className={styles.SearchForm} onSubmit={onSubmitHandler}>
        <button type="submit" className={styles['SearchForm-button']}>
          <span className={styles['SearchForm-button-label']}>Search</span>
        </button>

        <input
          className={styles['SearchForm-input']}
          type="text"
          autoComplete="off"
          autoFocus
          name="query"
          value={query}
          onChange={updateQuery}
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

Searchbar.defaultProps = { onSubmit: () => {} };
Searchbar.propTypes = { onSubmit: PropTypes.func };