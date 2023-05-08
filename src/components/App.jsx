import { useState, useEffect } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { getPictures } from 'servises/getPictures';
import { Modal } from './Modal/Modal'
import {Button} from './Button/Button'

export const App =()=> {
  const [request, setRequest] = useState('');
  const [pictures, setPictures] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalShown, setIsModalShown] = useState(false);
  const [choosedPicture, setChoosedPicture] = useState('');
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [error, setError] = useState(null);

  const createRequest = ({ inputValue }) => {
    setRequest(inputValue.trim());
    setPage(1);
    setPictures([]);
  };

  const handleClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  const showModal = () => {
    setIsModalShown(true);
  };

  const closeModal = () => {
    setIsModalShown(false);
    setChoosedPicture('');
  };

  const choosePicture = ({ target }) => {
    if (target.src) {
      setChoosedPicture(target.alt);
      showModal();
    }
  };

  useEffect(() => {
    request && setIsLoading(true);
    request&& 
    getPictures(request, page)
          .then(response => response.json())
      .then(data => {
        setPictures(prevState => [...prevState, ...data.hits]);
        setTotalHits(data.totalHits);

      })
          .catch(error => setError(error.message))
          .finally(() => {
            setIsLoading(false);
          });
  }, [request, page]);
  
    return (
      <div
        style={{
          height: '100vh',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <Searchbar createRequest={createRequest} />
        {isLoading && <Loader />}
        <ImageGallery onClick={choosePicture}>
          <ImageGalleryItem
            request={request}
            pictures={pictures}
            isLoading={isLoading}
            totalHits={totalHits}
            page={page}
          />
        </ImageGallery>
        {error&&<h1>Щось пішло не за планом</h1>}
        {pictures &&
          page !== Math.ceil(totalHits / 12) &&
          pictures.length >= 12 && (
            <Button handleClick={handleClick} />
          )}
        {isModalShown && (
          <Modal
            closeModal={closeModal}
            choosedPicture={choosedPicture}
          />
        )}
      </div>
    );
};
