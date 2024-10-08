import { SearchBar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
//import { getAPI } from '../pixabay-api';
import styles from './App.module.css';
import { Toaster } from 'react-hot-toast';
import { UseImagesContext } from 'context/imagesProvider';

export const App = () => {
  const {
    images,
    isLoading,
    isError,
    isEnd,
    handleSubmit,
    handleLoadMore
  } = UseImagesContext();

  return (
    <div className={styles.Appstyle}>
      <SearchBar onSubmit={handleSubmit} />
      <ImageGallery images={images} />
      {isLoading && <Loader />}
      {!isError && images.length > 0 && !isEnd && <Button onClick={handleLoadMore} />}
      {isError && <p>Something went wrong. Please try again later.</p>}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};


