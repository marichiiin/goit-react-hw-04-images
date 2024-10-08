import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

export const Modal = ({image, tags, onClose}) => {
    // declare a reference for the onclose prop to make sure the value is stable
    const onCloseRef = useRef(onClose);

    useEffect(() => {
        onCloseRef.current = onClose;
    }, [onClose]);

    useEffect(() => {
        const handleKeyDown = e => {
            if (e.code === 'Escape') {
                // we need to run the stable version of the onClose instead of the original onClose
                onCloseRef.current();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        //componentWillUnMount
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [])

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <img src={image} alt={tags} />
            </div>
        </div>
    )
}

Modal.propTypes = {
    image: PropTypes.string.isRequired,
    tags: PropTypes.string,
    onClose: PropTypes.func.isRequired
};
