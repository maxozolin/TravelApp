import React from 'react'
import { uuid } from 'uuidv4'

import { v4 as uuidv4 } from 'uuid'
export default function TripItem(props) {
    let i = 0
    let date = new Date(props.trip.date).toDateString()
    console.log(props)
    return (


        <div className="trip">
            <div className="headers">
                <h2>{props.trip.geoname.name}</h2>
                <h2>{date}</h2>
            </div>

            <section id={`carousel${props.trip.id}`} className="carousel slide" data-interval="false">
                <div className="carousel-inner" >
                    <ol className="carousel-indicators">
                        {
                            props.trip.pixabay.map(() => {
                                let ret = i == 0 ? <li data-target={`#carousel${props.trip.id}`} data-slide-to="0" key={uuidv4()} className="active"></li> : <li data-target={`#carousel${props.trip.id}`} data-slide-to="0" key={uuidv4()}></li>
                                i++
                                return ret
                            })
                        }

                    
                    </ol>
                    {i = 0}
                    {

                        props.trip.pixabay.map((value) => {
                            let ret = i == 0 ?

                                <div className="carousel-item active" key={uuidv4()}>
                                    <img src={value} className="img-responsive  center-block w-100" alt="..." />
                                </div>
                                :
                                <div className="carousel-item" key={uuidv4()}>
                                    <img src={value} className="d-block w-100" alt="..." />
                                </div>
                            i++
                            return ret
                        })
                    }

                    {/* <div className="carousel-item active">
                        <img src={`/TempImages/pexels-mihis-alex-21014.jpg`} className="img-responsive  center-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="/TempImages/old-1130743_1920.jpg" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="/TempImages/pexels-ylanite-koppens-697662.jpg" className="d-block w-100" alt="..." />
                    </div> */}
                </div>
                <a className="carousel-control-prev" href={`#carousel${props.trip.id}`} role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href={`#carousel${props.trip.id}`} role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>

            </section>
        </div>
    )
}
