import React from 'react'
import { uuid } from 'uuidv4'

import { v4 as uuidv4 } from 'uuid'
export default function TripItem(props) {

    let date = new Date(props.trip.date).toDateString()
    console.log(props)


    function headers() {
        if (props.trip.error) {
            if (props.trip.error.geoname) {
                return <div className="headers">
                    <h2>Location not found</h2>
                    <h2>{date}</h2>
                </div>
            }
        }
        return <div className="headers">
            <h2>{props.trip.geoname.name}</h2>
            <h2>{date}</h2>
        </div>
    }

    function carouselMain() {
        if (props.trip.error) {
            if (props.trip.error.pixabay) {
                return <section id={`carousel${props.trip.id}`} className="carousel slide" data-interval="false">
                    <div className="carousel-inner" >
                        <div className="carousel-item active" key={uuidv4()}>
                            <img src="/TempImages/pexels-pixabay-163185.jpg" className="img-responsive  center-block w-100" alt="..." />
                            <h1 className="carousel-caption bg-dark">NO IMAGE FOUND</h1>
                        </div>
                    </div>
                </section>
            }
        }
        let ret = <section id={`carousel${props.trip.id}`} className="carousel slide" data-interval="false">
            <div className="carousel-inner" >
                <ol className="carousel-indicators">
                    {carouselIndicators()}
                </ol>
                {carouselItems()}
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
        return ret


    }

    function carouselItems() {
        let i = 0;
        let arr = props.trip.pixabay.map((value) => {
            let ret =

                <div className={i == 0 ? "carousel-item active" : "carousel-item"} key={uuidv4()}>
                    <img src={value} className="img-responsive  center-block w-100" alt="..." />
                </div>
            i++
            return ret
        })
        return arr
    }
    function carouselIndicators() {
        let i = 0;
        let arr = props.trip.pixabay.map(() => {
            let ret = <li data-target={`#carousel${props.trip.id}`} data-slide-to="0" key={uuidv4()} className={i == 0 ? "active" : ""} ></li>
            i++
            return ret
        })
        return arr;
    }

    return (


        <div className="trip">
            {headers()}

            {carouselMain()}
        </div>
    )
}
