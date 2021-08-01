import React from 'react';
import PropTypes from 'prop-types';

import styles from './ImageGallery.module.css';

import ImageGalleryItem from './../ImageGalleryItem';

export default function ImageGallery({ imageList, onClick }) {
  const scrollTo = ref => {
    if (ref) {
    }
  };
  return (
    <>
      <ul className={styles.ImageGallery} onClick={onClick} ref={scrollTo}>
        {imageList.map(image => {
          return <ImageGalleryItem key={image.id} image={image} />;
        })}
      </ul>
    </>
  );
}

ImageGallery.defaultProps = {
  imageList: [],
  onClick: () => {},
};

ImageGallery.propTypes = {
  imageList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  ),
  onClick: PropTypes.func,
};