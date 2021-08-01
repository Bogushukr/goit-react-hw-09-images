import React from 'react';
import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ image: { small, hint } }) {
  return (
    <li className={styles.ImageGalleryItem}>
      <img
        src={small}
        alt={hint}
        className={styles['ImageGalleryItem-image']}
      />
    </li>
  );
}

ImageGalleryItem.defaultProps = {};
ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    small: PropTypes.string.isRequired,
    hint: PropTypes.string,
  }).isRequired,
};