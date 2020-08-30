
import React, { useContext, useRef } from 'react'
import { ModalContext } from './ModalContext'


function Modal(props) {
    const [modalDataContext, changeModalDataContext] = useContext(ModalContext)

        let noteTitle =  useRef()
        let noteBody =  useRef()
        let flight =  useRef()
        let pack =  useRef()



    let notesModal =
        <div className="modal fade " id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl">
                <div className="modal-content ">
                    <div className="modal-header">
                        <h5 className="modal-title">NOTES</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <label htmlFor="note-title">Title:</label><br />
                        <input type="text" name="note-title" defaultValue="Note" className="form-control" autoComplete="off" ref={noteTitle} />
                        <label htmlFor="note-body">Note:</label><br />
                        <input type="text" name="note-body" defaultValue="Visit the cool statue" className="form-control" autoComplete="off" ref={noteBody} />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={saveModal}>Save changes</button>
                    </div>
                </div>
            </div>
        </div>

    let flightModal =
        <div className="modal fade " id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl">
                <div className="modal-content ">
                    <div className="modal-header">
                        <h5 className="modal-title">FLIGHT</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <label htmlFor="flight">Note:</label><br />
                        <input type="text" name="date" defaultValue="Visit the cool statue" className="form-control" autoComplete="off" ref={flight}/>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={saveModal} data-dismiss="modal">Save changes</button>
                    </div>
                </div>
            </div>
        </div>

    let packModal =
        <div className="modal fade " id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl">
                <div className="modal-content ">
                    <div className="modal-header">
                        <h5 className="modal-title">PACK</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <input type="text" name="date" defaultValue="2xToothbrush, Pillow, T-Shirt" className="form-control" autoComplete="off"  ref={pack}/>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={saveModal}>Save changes</button>
                    </div>
                </div>
            </div>
        </div>



    function saveModal() {
        let id = callerId()
        switch (modalDataContext.callerButton) {
            case 'notes':
                props.data.changeData((prev) => {
                    let ret = Object.assign({}, prev)
                    let trip = ret.planner.trips.find((item) => {
                        if (item.id == id) {
                            return item
                        }
                    })
                    console.log(noteTitle.current.value)
                    trip.notes.push({
                        "title": noteTitle.current.value,
                        "body": noteBody.current.value
                    })
                    return ret
                })
                break;
            case 'flight':
                props.data.changeData((prev) => {
                    let ret = Object.assign({}, prev)
                    let trip = ret.planner.trips.find((item) => {
                        if (item.id == id) {
                            return item
                        }
                    })
                    console.log(flight.current.value)
                    trip.flight=flight.current.value
                    return ret
                })
                break;
            case 'pack':
                props.data.changeData((prev) => {
                    let ret = Object.assign({}, prev)
                    let trip = ret.planner.trips.find((item) => {
                        if (item.id == id) {
                            return item
                        }
                    })
                    console.log(pack.current.value)
                    trip.pack.push(pack.current.value)
                    return ret
                })
                break;
            default:
                break;
        }
    }

    function callerId() {
        if (modalDataContext.id) {
            return modalDataContext.id
        }
        return undefined
    }
    function chooseInput() {
        switch (modalDataContext.callerButton) {
            case 'notes':
                return notesModal
                break;
            case 'flight':
                return flightModal
                break;
            case 'pack':
                return packModal
                break;
            default:
                return packModal;
        }
    }

    return (
        <>
            {chooseInput()}
        </>
    )
}

export default Modal