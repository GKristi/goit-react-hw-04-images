import { useCallback, useEffect, useState } from 'react';
import Button from '../Button/Button';
import ImageGallery from '../ImageGallery/ImageGallery';
import Modal from '../Modal/Modal';
import Searchbar from '../SearchBar/SearchBar';
import { Container } from './App.styled';
import { getImages } from 'components/api/pixabay-api';
import { Oval } from 'react-loader-spinner';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const App = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isShowModal, setIsShowModal] = useState(false);
  const [imageForModal, setImageForModal] = useState('');
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(null);
  const [result, setResult] = useState(null);

  const getInputImages = useCallback(async () => {
    try {
      setLoader(true);
      const { data } = await getImages(searchQuery, page);
      if (data.hits.length < 1) {
        Notify.info("We can't find images for your request");
        return;
      }
      setImages(images => [...images, ...data.hits]);
      setResult(page * 12);
      setTotalHits(data.totalHits);
    } catch (error) {
      setError(true);
    } finally {
      setLoader(false);
    }
  }, [page, searchQuery]);

  useEffect(() => {
    if (searchQuery) getInputImages();
  }, [searchQuery, getInputImages]);

  const addInputData = value => {
    if (searchQuery === value) {
      return;
    }
    setSearchQuery(value);
    setImages([]);
    setPage(1);
  };

  const getModalPhoto = image => {
    setImageForModal(image);
    setIsShowModal(true);
  };

  const closeModal = () => {
    setIsShowModal(false);
  };

  const getMorePhoto = () => {
    setPage(page => page + 1);
  };

  return (
    <Container>
      <Searchbar onSubmit={addInputData} />
      {images && images.length > 0 && (
        <ImageGallery images={images} getModalPhoto={getModalPhoto} />
      )}
      {loader && (
        <Oval
          height={80}
          width={80}
          color="#4fa94d"
          wrapperStyle={{ margin: '200px auto' }}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#4fa94d"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      )}
      {error && <p>Oooops! Something went wrong...</p>}
      {images && images.length > 0 && result < totalHits && (
        <Button getMorePhoto={getMorePhoto} />
      )}
      {isShowModal && (
        <Modal largeImageURL={imageForModal} closeModal={closeModal} />
      )}
    </Container>
  );
};

export default App;