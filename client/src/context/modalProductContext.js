import React, { createContext, useReducer } from 'react';
export const ModalProductContext = createContext();

export const ModalProductContextProvider = (props) => {
    const productNoti = {};
    
    const [state, dispatchModal] = useReducer((state, {type, payload}) => {
        switch (type) {
            case "ADD_MODAL_CONTEXT":
                return {
                    status: payload.status,
                    title: payload.title,
                    message: payload.message,
                };
            case "DELETE_MODAL_CONTEXT":
                return {
                    status: payload.status,
                    title: payload.title,
                    message: payload.message,
                };
            default:
                return state;
        }
    }, productNoti)

    return (
        <ModalProductContext.Provider value={{state, dispatchModal}}>
            { props.children }
        </ModalProductContext.Provider>
    )
}