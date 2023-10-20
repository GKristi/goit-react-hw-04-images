import React, { Component } from 'react';
import { Overlay, ModalStyle } from './Modal.styled';

class Modal extends Component {
    componentDidMount() {
        document.addEventListener('keydown', this.closeModalByEsc);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.closeModalByEsc);
    }

    closeModalByEsc = ({ code }) => {
        if (code === 'Escape') this.props.closeModal();
    };

    closeModal = ({ target, currentTarget }) => {
        if (target === currentTarget) this.props.closeModal();
    };
    render() {
        const { largeImageURL, tags } = this.props;
        return (
            <Overlay onClick={this.closeModal}>
                <ModalStyle>
                    <img src={largeImageURL} alt={tags} />
                </ModalStyle>
            </Overlay>
        );
    }
}

export default Modal;