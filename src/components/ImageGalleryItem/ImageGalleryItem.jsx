import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';
import { useToggle } from 'components/hooks/useToggle';
import css from './ImageGalleryItem.module.css';


export const ImageGalleryItem = ({ image }) => {
    const { showModal, toggle } = useToggle();

    useEffect(() => {
        const gallery = document.querySelector('.js-gallery');
        if (!gallery) return;


        if (showModal) {
            gallery.style.pointerEvents = 'none';
        } else {
            gallery.style.pointerEvents = 'auto';
        }
    }, [showModal])

    const { webformatURL, largeImageURL, tags } = image;
    return (
        <li className={css.ImageGalleryItem} >
            <img
                className={css.ImageGalleryItemImage}
                src={webformatURL}
                alt={tags}
                onClick={toggle}
            />
            {showModal && (<Modal image={largeImageURL} tags={tags} onClose={toggle}/>)}
        </li>
    )
}

ImageGalleryItem.propTypes = {
    image: PropTypes.shape({
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
        tags: PropTypes.string,
    }).isRequired,
};
