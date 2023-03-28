import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import propTypes from 'prop-types';

const ImageGallery = ({ imagesArr, showModal }) => {
  return (
    <ul className={css.imageGallery}>
      {imagesArr.map(({ webformatURL, largeImageURL, id, tags }) => (
        <ImageGalleryItem
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          tags={tags}
          key={id}
          showMod={showModal}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  imagesArr: propTypes.array,
  showModal: propTypes.func,
};
