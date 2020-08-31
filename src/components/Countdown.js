import React, { useState, useEffect } from 'react'
import functions from '../../functions/functions'

export default function Countdown(props) {
    
    const countDownDate = new Date(props.date).getTime()

    const [time, changeTime] = useState({
        "time": 0
    })

    function Counter() {
        changeTime(() => {
            return { "time": functions.Counter(countDownDate) }
            
        })
    }
    useEffect(()=>{
        Counter()
        let interval = setInterval(Counter,1800000)
        return function cleanup() {
            clearInterval(interval)
        }

    },[])

    function chooseWording(){
        if(time.time>0){
            return `${time.time} days to go`
        }
        if(time.time == 0){
            return `today!`
        }
            return `${-time.time} days ago`

    }

    return (
        <>
        {console.log(functions)}
        {chooseWording()}
        </>
    )
}
