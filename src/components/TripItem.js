import React from 'react'
import { uuid } from 'uuidv4'
import Countdown from './Countdown'

import { v4 as uuidv4 } from 'uuid'
import Buttons from './Buttons'
import Remove from './Remove'

export default function TripItem(props) {

    let date = new Date(props.trip.date).toDateString()
    console.log(props)

    let binsvg = <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
        viewBox="0 0 172.541 172.541" style={{ enableBackground: "new 0 0 172.541 172.541" }} >
        <g>
            <path d="M166.797,25.078h-13.672h-29.971V0H49.388v25.078H19.417H5.744v15h14.806l10,132.463h111.443l10-132.463h14.805V25.078z
        M64.388,15h43.766v10.078H64.388V15z M128.083,157.541H44.46L35.592,40.078h13.796h73.766h13.796L128.083,157.541z"/>
            <rect x="80.271" y="65.693" width="12" height="66.232" />
            <rect x="57.271" y="65.693" width="12" height="66.232" />
            <rect x="103.271" y="65.693" width="12" height="66.232" />
        </g>
    </svg>


    let removeFunctions = {
        "notes": (id) => {
            props.state.changeData((prev) => {
                let ret = Object.assign({}, prev)

                const trips = ret.planner.trips
                let trip = trips[trips.findIndex(el => el.id === props.trip.id)]

                trip.notes = trip.notes.filter((note) => {
                    return note.id !== id
                })

                return ret
            })
        },
        "pack": (id) => {
            props.state.changeData((prev) => {
                let ret = Object.assign({}, prev)

                const trips = ret.planner.trips
                let trip = trips[trips.findIndex(el => el.id === props.trip.id)]

                trip.pack = trip.pack.filter((item) => {
                    return item.id !== id
                })

                return ret
            })

        },
        "trip": (id) => {
            props.state.changeData((prev) => {
                let ret = Object.assign({}, prev)
                ret.planner.trips = ret.planner.trips.filter((trip) => {
                    return trip.id !== id
                })


                return ret
            })

        }
    }


    function headers() {
        if (props.trip.error) {
            if (props.trip.error.geoname) {
                return (
                    <div className="headers">
                        <Remove class={"removeTrip"} id={props.trip.id} removeFunction={removeFunctions.trip} svg={binsvg} />
                        <h2 className="headLocation">Location not found</h2>
                        <h2 className="headDate">{date} <Countdown date={props.trip.date} /> </h2>
                    </div>
                )
            }
        }
        return (
            <div className="headers">
                <Remove class={"removeTrip"} id={props.trip.id} removeFunction={removeFunctions.trip} svg={binsvg} />
                <h2 className="headLocation">{props.trip.geoname.name}</h2>
                <h2 className="headDate">{date} <Countdown date={props.trip.date} /> </h2>
            </div>
        )
    }

    function carouselMain() {
        if (props.trip.error) {
            if (props.trip.error.pixabay) {
                return <section id={`carousel${props.trip.id}`} className="carousel slide" data-interval="false">
                    <div className="carousel-inner" >
                        <div className="carousel-item active" key={uuidv4()}>
                            <img src="/Images/pexels-pixabay-163185.jpg" className="img-responsive  center-block w-100" alt="..." />
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



    function weather() {
        let ret;
        if (props.trip.error) {
            if (props.trip.error.weatherbit) {
                ret = <div>No weather found</div>
                return <div className="weather">{ret}</div>
            }
        }
        ret = <>
            <div>{props.trip.weatherbit.weather.description}</div>
            <img src={`https://www.weatherbit.io/static/img/icons/${props.trip.weatherbit.weather.icon}.png`} />
        </>

        return <div className="weather content">{ret}</div>

    }

    function pack() {
        if (props.trip.pack.length > 0) {
            let items = props.trip.pack.map((item) => {
                return (
                    <div className="itemwrapper wrapper" key={item.id}>
                        <li className="item meat">{item.item}</li>
                        <Remove id={item.id} removeFunction={removeFunctions.pack} class={"removeItem"} />
                    </div>
                )
            })
            return (
                <>
                    <h4 className="bg-dark">to pack:</h4>
                    <div className="pack content">
                        <ul>{items}</ul>
                    </div>
                </>
            )

        }
    }

    function notes() {
        if (props.trip.notes.length > 0) {
            let notes = props.trip.notes.map((note) => {
                return (
                    <div className="notewrapper wrapper" key={note.id}>
                        <div className="note meat">
                            <h5>{note.title}</h5>
                            <p>{note.body}</p>
                        </div>
                        <Remove id={note.id} removeFunction={removeFunctions.notes} />
                    </div>
                )
            })
            return <><h4 className="bg-dark">notes:</h4><div className="notes content">{notes}</div></>

        }
    }


    function flight() {
        if (props.trip.flight) {
            let flight = <p>{props.trip.flight}</p>
            return <><h4 className="bg-dark" >flight:</h4><div className="flight content">{flight}</div></>

        }
    }



    return (


        <div className="trip">
            {headers()}
            <div className="left-wrapper">
                {carouselMain()}
                <Buttons id={props.trip.id} />
            </div>
            <div className="info">
                <h4 className="bg-dark ">weather:</h4>
                {weather()}
                {flight()}
                {notes()}
                {pack()}
                {console.log(props.state)}
            </div>

        </div>
    )
}
