import React from 'react';
import { useState, useEffect, useCallback } from 'react';

import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import Modal from './components/Modal';
import Loader from './components/Loader';
import fetchImagesDataPixabay from './apiPixabay';
import { scrollTop, scrollBottom } from './scroll.js';

import styles from './App.module.css';

export default function App() {
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setToatalPages] = useState(0);
  const [url, setUrl] = useState('');
  const [hint, setHint] = useState('');
  const [showModal, setModla] = useState(false);
  const [loading, setLoad] = useState(false);
  const [empty, setEmpty] = useState(false);

  const toggleModal = useCallback(() => {
    setModla(showModal => !showModal);
  }, []);

  const getLargeImage = small => {
    return images.find(image => image.small === small);
  };

  const onChangeSearchQuery = searchValue => {
    if (search !== searchValue) {
      setImages([]);
      setSearch(searchValue);
      setPage(1);
      setToatalPages(0);
      setUrl('');
      setHint('');
      setModla(false);
      setLoad(false);
      setEmpty(false);
    } else {
      scrollTop();
    }
  };

  useEffect(() => {
    if (!search) {
      return;
    }
    async function fetchImages(search, page) {
      try {
        setLoad(true);
        const { data, totalPages } = await fetchImagesDataPixabay(search, page);
        setImages(prev => [...prev, ...data]);
        setEmpty(data.length === 0);
        setToatalPages(totalPages);
        scrollBottom();
      } catch (error) {
        throw error;
      } finally {
        setLoad(false);
      }
    }

    fetchImages(search, page);
  }, [search, page]);

  const onImageClickHandler = event => {
    event.preventDefault();
    const targetEl = event.target;
    if (targetEl.nodeName === 'IMG') {
      const { large, hint } = getLargeImage(targetEl.src);
      setUrl(large);
      setHint(hint);
      toggleModal();
    }
  };

  const left = totalPages - page;

  return (
    <>
      <div className={styles.App}>
        <Searchbar onSubmit={onChangeSearchQuery} />
        {empty ? (
          <div className={styles.App__message}>
            <p>Images are not found for "{search}"</p>
          </div>
        ) : (
          <>
            <ImageGallery imageList={images} onClick={onImageClickHandler} />
            {page < totalPages && (
              <div className={styles.App__container}>
                <Button onClick={() => setPage(page => page + 1)}>
                  Load more [{left}]
                </Button>
              </div>
            )}
          </>
        )}
      </div>
      {showModal && (
        <Modal onClose={toggleModal}>
          <img className={styles.Modal__img} src={url} alt={hint} />
        </Modal>
      )}
      {loading && <Loader />}
    </>
  );
}