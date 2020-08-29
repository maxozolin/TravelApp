import React, {useState, createContext} from 'react'

export const ModalContext = createContext()

export function ModalProvider(props) {
    const [modalDataContext, changeModalDataContext] = useState({
        "id":undefined
    });

    return (
        <ModalContext.Provider value = {[modalDataContext, changeModalDataContext]}>
            {props.children}
        </ModalContext.Provider>

    );
}
