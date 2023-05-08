import { useEffect } from 'react';
import css from './Modal.module.css'

export const Modal = ({ closeModal, choosedPicture }) => {

  useEffect(() => {
  const handlePressESC = e => {
    if (e.code === 'Escape') closeModal();
  };
    window.addEventListener('keydown', handlePressESC);

    return () => {
      window.removeEventListener('keydown', handlePressESC);
    };
  }, [closeModal]);

  return (
    <div className={css.Overlay} onClick={closeModal}>
      <div>
        <img className={css.modalPic} src={choosedPicture} alt="" />
      </div>
    </div>
  );
};
