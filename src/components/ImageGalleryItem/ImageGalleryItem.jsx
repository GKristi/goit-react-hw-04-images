import React from 'react';
import { GalleryItem, GalleryImg } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({
    webformatURL,
    largeImageURL,
    getModalPhoto,
    tags,
}) => {
    return (
        <GalleryItem onClick={() => getModalPhoto(largeImageURL)}>
            <GalleryImg src={webformatURL} alt={tags} />
        </GalleryItem>
    );
};

export default ImageGalleryItem;