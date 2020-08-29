
import React, { useContext } from 'react'
import { ModalContext } from './ModalContext'


function Modal(props) {
    const [modalDataContext, changeModalDataContext] = useContext(ModalContext)



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
                        <input type="text" name="note-title" defaultValue="Note" className="form-control" autocomplete="off"/>
                        <label htmlFor="note-body">Note:</label><br />
                        <input type="text" name="note-body" defaultValue="Visit the cool statue" className="form-control"autocomplete="off" />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
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
                        <input type="text" name="date" defaultValue="Visit the cool statue" className="form-control" autocomplete="off" />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
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
                        ...
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>



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