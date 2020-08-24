
import React from 'react'
import TripItem from './TripItem'

export default function TripList(props) {
    return (
        <div className="triplist">{
        props.trips.map((trip)=>{
                return <TripItem key = {trip.id} trip = {trip} />
        })
        }
        </div>
    )
}
