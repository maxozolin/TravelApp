import React from 'react'
import { uuid } from 'uuidv4'
import Countdown from './Countdown'

import { v4 as uuidv4 } from 'uuid'
import Buttons from './Buttons'
import Remove from './Remove'

export default function TripItem(props) {

    let date = new Date(props.trip.date).toDateString()
    console.log(props)



    function headers() {
        if (props.trip.error) {
            if (props.trip.error.geoname) {
                return <div className="headers">
                    <h2 className="headLocation">Location not found</h2>
                    <h2 className="headDate">{date} <Countdown date={props.trip.date} /> </h2>

                </div>
            }
        }
        return <div className="headers">
            <h2 className="headLocation">{props.trip.geoname.name}</h2>

            <h2 className="headDate">{date} <Countdown date={props.trip.date} /> </h2>

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
                return <li key={item.id} onClick={()=>{removeFuntions.pack(item.id)}}>{item.item}</li>
            })
            return <><h4 className="bg-dark">to pack:</h4><div className="pack content"><ul>{items}</ul></div></>

        }
    }

    function notes(){
        if (props.trip.notes.length > 0) {
            let notes = props.trip.notes.map((note) => {
            return <div className="note" key={note.id} onClick={()=>{removeFuntions.notes(note.id)}}><h5>{note.title}</h5> <p>{note.body}</p></div>
            })
            return <><h4 className="bg-dark">notes:</h4><div className="notes content">{notes}</div></>

        }
    }

    
    function flight(){
        if (props.trip.flight) {
            let flight = <p>{props.trip.flight}</p>
            return <><h4 className="bg-dark" >flight:</h4><div className="flight content">{flight}</div></>

        }
    }

    let removeFuntions = {
        "notes": (id)=>{
            props.state.changeData((prev) => {
                let ret = Object.assign({}, prev)

                const trips = ret.planner.trips
                let trip = trips[trips.findIndex(el => el.id === props.trip.id)]

                trip.notes = trip.notes.filter((note)=>{
                    return note.id !== id
                })

                return ret
            })
        },
        "pack": (id)=>{
            props.state.changeData((prev) => {
                let ret = Object.assign({}, prev)

                const trips = ret.planner.trips
                let trip = trips[trips.findIndex(el => el.id === props.trip.id)]

                trip.pack = trip.pack.filter((item)=>{
                    return item.id !== id
                })

                return ret
            })
            
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
