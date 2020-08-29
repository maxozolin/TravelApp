import React, {useContext} from 'react'
import {ModalContext} from './ModalContext'


export default function Buttons(props) {
    const [modalDataContext, changeModalDataContext] = useContext(ModalContext) 

    function assignId(prev){
        let ret = Object.assign({}, prev)
        ret.id=props.id
        return ret
    }
    function changeModal(e){
        let databuttton=e.target.getAttribute("data-button")
        changeModalDataContext((prev)=>{

            let ret = assignId(prev)
            ret.callerButton=databuttton
            return ret
        })
    }
    return (
        <div className="btns-timer-wrapper">
            <div className="buttons">
                <button type="button" className="btn btn-dark col-12 " data-toggle="modal" data-target="#exampleModal" data-button="notes" onClick={changeModal}>+ Add Notes</button>
                <button type="button" className="btn btn-light border border-dark col-12 " data-toggle="modal" data-target="#exampleModal" data-button="flight" onClick={changeModal}>+ Add flight number</button>
                <button type="button" className="btn btn-light border border-dark col-12 " data-toggle="modal" data-target="#exampleModal" data-button="pack" onClick={changeModal}>+ To pack</button>
            </div>
        </div>
    )
}
