import './styles.css';
import React, { Component } from 'react';
import Searchbar from './components/Searchbar/Searchbar';
import { PixabayFetchFunc } from './services/apiSearchImg';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import Modal from './components/Modal/Modal';
import Loader from './components/Loader/Loader';
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '23145424-17de0e2191faefedd106abc58';
const onLoader = 'false';
const newPixabayFetchFunc = new PixabayFetchFunc(BASE_URL, API_KEY, onLoader);
console.log('SEARCH', newPixabayFetchFunc);
class App extends Component {
  state = {
    arreyImages: [],
    searchQuery: '',
    searchValue: '',
    status: 'init',
    openModal: false,
    onLoader: false,
  };

  fullImageURL = '';
  componentDidMount() {}
  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.setState({ onLoader: true });

      newPixabayFetchFunc.resetPage();

      newPixabayFetchFunc.searchQuery = this.state.searchQuery;
      newPixabayFetchFunc
        .getImages()
        .then(response => {
          this.setState({ arreyImages: response });
          console.log(response);
        })

        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.setState({ onLoader: false });
          console.log(this.state.onLoader);
        });

      this.scrollHandler();
    }
    if (
      prevState.arreyImages.length !== this.state.arreyImages.length &&
      prevState.arreyImages.length !== 0
    ) {
      this.setState({ openModal: false });
      this.scrollHandler();
    }
  }
  closeModal = () => {
    this.fullImageURL = '';
    this.setState({ openModal: false });
  };

  showImageHandler = imageURL => () => {
    this.fullImageURL = imageURL;
    this.setState({ openModal: true });
  };

  onsubmitHandler = submitSearchForm => {
    // this.maxPages = 0;

    this.setState(() => ({
      // arreyImages: [],
      searchQuery: submitSearchForm,
      // searchPage: 1,
    }));
  };

  scrollHandler = () => {
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }, 800);
  };

  loadMoreHandler = () => {
    newPixabayFetchFunc.searchPage = 1;

    console.log('searchPage', newPixabayFetchFunc.searchPage);

    this.setState({ onLoader: true });

    newPixabayFetchFunc
      .getImages()
      .then(arreyImages => {
        this.setState(prev => ({
          arreyImages: [...prev.arreyImages, ...arreyImages],
        }));
      })
      .catch(error => {
        console.log('НАХІБА ТАКЕ РОБИТИ', error);
      })
      .finally(() => {
        return this.setState({ onLoader: false });
      });
  };

  // resetLoader = () => {
  //   this.setState({ onLoader: true });
  // };

  render() {
    return (
      <div className="App">
        <Searchbar onSubmit={this.onsubmitHandler} />

        {this.state.arreyImages.length > 0 && (
          <ImageGallery
            arreyImages={this.state.arreyImages}
            scrollHandler={this.scrollHandler}
            showImageHandler={this.showImageHandler}
          />
        )}

        {/* {newPixabayFetchFunc.onLoader && <Loader />} */}
        {this.state.onLoader && <Loader />}
        {this.state.arreyImages.length > 0 && (
          <Button
            loadMorer={this.loadMoreHandler}
            // scrollHandler={this.scrollHandler()}
            text="LOAD MORE..."
          />
        )}
        {this.state.openModal && (
          <Modal
            fullImageURL={this.fullImageURL}
            // fullScrinImages={this.fullScrinImages}
            exitModal={this.closeModal}
          ></Modal>
        )}
      </div>
    );
  }
}

export default App;
