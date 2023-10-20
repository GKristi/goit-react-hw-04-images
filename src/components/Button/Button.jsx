import React from 'react';
import { LoadMoreBtn } from './Button.styled';

const Button = ({ getMorePhoto }) => {
    return <LoadMoreBtn onClick={getMorePhoto}>Load more</LoadMoreBtn>;
};

export default Button;