import { Component } from 'react';
import Button from '../Button/Button';
import ImageGallery from '../ImageGallery/ImageGallery';
import Modal from '../Modal/Modal';
import Searchbar from '../SearchBar/SearchBar';
import { Container } from './App.styled';
import { getImages } from 'components/api/pixabay-api';
import { Oval } from 'react-loader-spinner';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

class App extends Component {
  state = {
    images: [],
    error: false,
    loader: false,
    searchQuery: '',
    isShowModal: false,
    imageForModal: '',
    page: 1,
    totalHits: null,
    result: null,
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.searchQuery !== this.state.searchQuery ||
      prevState.page !== this.state.page
    )
      this.getInputImages();
  }

  getInputImages = async () => {
    try {
      this.setState({ loader: true });
      const { data } = await getImages(this.state.searchQuery, this.state.page);
      if (data.hits.length < 1) {
        Notify.info("We can't find images for your request");
        return;
      }
      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
        result: this.state.page * 12,
        totalHits: data.totalHits,
      }));
    } catch (error) {
      this.setState({ error: true });
    } finally {
      this.setState({
        loader: false,
      });
    }
  };

  addInputData = searchQuery => {
    this.setState({
      searchQuery,
      images: [],
      page: 1,
    });
  };

  getModalPhoto = image => {
    this.setState({
      imageForModal: image,
      isShowModal: true,
    });
  };

  closeModal = () => {
    this.setState({ isShowModal: false });
  };

  getMorePhoto = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  render() {
    const {
      images,
      loader,
      error,
      isShowModal,
      imageForModal,
      totalHits,
      result,
    } = this.state;
    const { addInputData, getModalPhoto, getMorePhoto, closeModal } = this;
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
            color="#005BBB"
            wrapperStyle={{ margin: '200px auto' }}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#FFD500"
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
  }
}

export default App;
