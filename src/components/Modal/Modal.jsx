import { useEffect } from 'react';
import { Overlay, ModalStyle } from './Modal.styled';

const Modal = ({ closeModal, largeImageURL, tags }) => {
    useEffect(() => {
        const closeModalByEsc = ({ code }) => {
            if (code === 'Escape') closeModal();
        };
        document.addEventListener('keydown', closeModalByEsc);
        return () => {
            document.removeEventListener('keydown', closeModalByEsc);
        };
    }, [closeModal]);

    const hendlerCloseModal = ({ target, currentTarget }) => {
        if (target === currentTarget) closeModal();
    };

    return (
        <Overlay onClick={hendlerCloseModal}>
            <ModalStyle>
                <img src={largeImageURL} alt={tags} />
            </ModalStyle>
        </Overlay>
    );
};

export default Modal;