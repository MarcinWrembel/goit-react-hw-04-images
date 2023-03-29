import React from 'react';
import Searchbar from './Searchbar/Searchbar';
import axios from 'axios';
import fetchImages from '../utils/api';
import ImageGallery from './ImageGallery/ImageGallery';
import key from '../utils/key.json';

import Modal from './Modal/Modal';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import { useState } from 'react';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'index.css';

axios.defaults.baseURL = `https://pixabay.com/api`;

const KEY = Object.values(key);
const PER_PAGE = 12;

let params = '';

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [totalHits, setTotalHits] = useState(0);
  const [isLastPage, setLastPage] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleSubmit = async phrase => {
    setQuery(phrase);
    params = `/?q=${phrase}&page=1&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`;

    //starts with loading status
    setLoading(true);

    try {
      //invoking fetching images
      const imageArr = await fetchImages(params);

      //setting new state values
      setImages(imageArr.hits);
      setTotalHits(imageArr.totalHits);
      setLastPage(checkIfLastPage(imageArr.totalHits));

      if (checkIfLastPage(imageArr.totalHits)) {
        messageIfMax();
      }

      if (imageArr.totalHits > PER_PAGE && query !== phrase) {
        setPage(2);
      }
    } catch (error) {
      //handling error

      toast.error(error.message, {
        position: 'top-right',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: 'light',
      });
    } finally {
      // changing state for laoder independently on promise (fetchImages) return
      setLoading(false);
    }
  };

  //method to return isLastPage (boolean) basing on number of hits for searching
  const checkIfLastPage = totalHits => {
    const noOfPages = Math.ceil(totalHits / PER_PAGE);
    const isLastPage = noOfPages === page;

    return isLastPage;
  };

  //method to show modal basing on isModalVisible state value
  const showModal = largeImg => {
    setModalVisible(true);
    setLargeImageURL(largeImg);
  };

  //method to show modal basing on isModalVisible state value
  const hideModal = () => {
    setModalVisible(false);
    setLargeImageURL('');
  };

  const loadMore = async e => {
    e.preventDefault();

    params = `/?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`;

    try {
      //invoking fetching images
      const imageArr = await fetchImages(params);

      //setting new state values
      setImages(imageArr.hits);
      setTotalHits(imageArr.totalHits);
      setLastPage(checkIfLastPage(imageArr.totalHits));

      //changing state and add new images to existing ones on load more btn
      if (imageArr && imageArr.hits.length > 0) {
        setImages([...images, ...imageArr.hits]);
        setLoading(false);
        setPage(page + 1);
      }

      if (isLastPage) {
        messageIfMax();
      }
    } catch (error) {
      //handling error

      toast.error(error.message, {
        position: 'top-right',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: 'light',
      });
    } finally {
      // changing state for laoder independently on promise (fetchImages) return
      setLoading(false);
    }
  };

  //method to show info if maximum number of images is loaded
  const messageIfMax = () => {
    toast.info("You've have reached maximum number of images ", {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

  return (
    <div className="App">
      <Searchbar onFormSubmit={handleSubmit} query={query} pageNo={page} />
      {isLoading && <Loader />}

      <ImageGallery imagesArr={images} showModal={showModal} />
      {isModalVisible && <Modal hideMod={hideModal} largeImg={largeImageURL} />}
      <ToastContainer />
      {totalHits > 12 && isLastPage === false ? (
        <Button loadMore={loadMore} />
      ) : (
        ''
      )}
      {/* {isLastPage === true && messageIfMax()} */}
    </div>
  );
};

export default App;
