import React from 'react';
import { useEffect } from 'react';

import { createPortal } from 'react-dom';

import PropTypes from 'prop-types';
import styles from './Modal.module.css';

const modalRoot = document.querySelector('#front-root');

export default function Modal({ onClose, children }) {
  const backdropOnClickHandler = ({ target, currentTarget }) => {
    if (target === currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const keyEvent = ({ code }) => {
      switch (code) {
        case 'Escape':
          onClose();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', keyEvent);
    document.body.classList.add('modal-open');
    return () => {
      window.removeEventListener('keydown', keyEvent);
      document.body.classList.remove('modal-open');
    };
  }, [onClose]);

  return createPortal(
    <div className={styles.Overlay} onClick={backdropOnClickHandler}>
      <div className={styles.Modal}>{children}</div>
    </div>,
    modalRoot,
  );
}
Modal.propTypes = { children: PropTypes.node };
