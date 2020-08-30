import React, {useContext} from 'react'
import { v4 as uuidv4 } from 'uuid'
import {ModalContext} from '../contexts/ModalContext'

export default function Remove(props) {
    let id = props.id
    function removeItem(){
        props.removeFunction(id)
    }
    
    return (
        <div key={uuidv4()} className="remove-btn" onClick={removeItem}> 
        </div>
    )
}
