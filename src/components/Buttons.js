import React, {useContext} from 'react'
import {ModalContext} from './ModalContext'


export default function Buttons(props) {
    const [modalDataContext, changeModalDataContext] = useContext(ModalContext) 

    function changeModal(){
        changeModalDataContext((prev)=>{
            let ret ={'id': props.id}
            return ret
        })
    }
    return (
        <div className="btns-timer-wrapper">
            <div className="buttons">
                <button type="button" className="btn btn-dark col-12" data-toggle="modal" data-target="#exampleModal" onClick={changeModal}>+ Add Notes</button>
                <button type="button" className="btn btn-light border border-dark col-12">+ Add flight number</button>
                <button type="button" className="btn btn-light border border-dark col-12">+ To pack</button>
            </div>
        </div>
    )
}
