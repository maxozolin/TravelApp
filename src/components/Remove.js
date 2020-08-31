import React, {useContext} from 'react'
import { v4 as uuidv4 } from 'uuid'
import {ModalContext} from '../contexts/ModalContext'

export default function Remove(props) {
    function removeItem(){
        console.log(props.removeFunction)
        props.removeFunction(props.id)
    }
    
    let svg =  <svg enableBackground="new 0 0 24 24" height="512" viewBox="0 0 24 24" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m12 0c-6.617 0-12 5.383-12 12s5.383 12 12 12 12-5.383 12-12-5.383-12-12-12z" fill="#607d8b"/><path d="m12 24c-6.617 0-12-5.383-12-12s5.383-12 12-12 12 5.383 12 12-5.383 12-12 12zm0-22.5c-5.79 0-10.5 4.71-10.5 10.5s4.71 10.5 10.5 10.5 10.5-4.71 10.5-10.5-4.71-10.5-10.5-10.5z"/><path d="m17.25 12.75h-10.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h10.5c.414 0 .75.336.75.75s-.336.75-.75.75z"/></svg>

    if(props.svg){
        svg = props.svg
    }
    return (
        <div key={uuidv4()} className={`remove-btn ${props.class}`} onClick={removeItem} > 
            {svg}
        </div>
    )
}
