import { useState } from 'react';

export const useToggle = () => {
    // Declare reusable state
    const [showModal, setShowModal] = useState(false);

    // Declare reusable modifier
    const toggle = () => {
        setShowModal(!showModal);
    }
    // Return reusable values as one object
    return { showModal, toggle };
}