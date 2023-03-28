import React from 'react';
import css from './Modal.module.css';
import propTypes from 'prop-types';
import { useEffect } from 'react';

const Modal = ({ hideMod, largeImg }) => {
  // useEffect(() => { function that will execute }, [ condition on which the function will execute ])

  useEffect(() => {
    const handleClose = event => {
      if (event.code === 'Escape') {
        return hideMod();
      }
    };

    //action on mount
    window.addEventListener('keyup', handleClose);

    //action on unmount
    return () => {
      window.removeEventListener('keyup', handleClose);
    };
  }, [hideMod]);

  return (
    <div className={css.overlay} onClick={hideMod}>
      <div className={css.modal}>
        <img src={largeImg} alt="result" />
      </div>
    </div>
  );
};

export default Modal;

Modal.propTypes = {
  largeImg: propTypes.string,
};
