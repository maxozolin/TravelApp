import React from 'react'
import Separator from './Separator'

export default function Planner() {
    return (
        <>
            <Separator url='/TempImages/pexels-alfonso-escalante-2533092.jpg' text="LET'S GET STARTED" />
            <div id="planner" className="col-12 col-md-7 container" >
                <h1 className="firstheader">Travel Planner</h1>
                <div className="plannercontainer"></div>
                    <form className="row">
                        <div className="form-group col-12 col-lg-9">
                            <label htmlFor="destination">Destination:</label><br />
                            <input type="text" id="destination" name="destination" defaultValue="Paris" className="form-control" />
                            <label htmlFor="date">Date:</label><br />
                            <input type="date" id="date" name="date" defaultValue="Doe" className="form-control" />
                        </div>
                        <div className="col-12 col-lg-3 buttons container">
                            <button type="button" className="btn btn-dark col-4 col-lg-12">Add trip</button>
                            <button type="button" className="btn btn-light border border-dark col-4 col-lg-12">Random</button>
                        </div>
                    </form>
            </div>
        </>
    )
}
