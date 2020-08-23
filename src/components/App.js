import React, { useState, useEffect, useRef } from 'react';
import uuid from 'uuid'
import Modal from './Modal'
import Navbar from './Navbar'
import Home from './Home';
import About from './About';
import Planner from './Planner'
import Footer from './Footer'

const LOCAL_STORAGE_KEY = 'websiteApp.appData'

function App() {

    const [appData, changeData] = useState({
        "OverlayActive": false
    })
    const cityNameRef = useRef()




    let callApi = async () => {
        let city = cityNameRef.current.value;

        if (city !== "") {
            const settings = {
                method: 'post',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "city": city })
            };
            try {
                //Post coords to server
                const res = await fetch(`/api/app`, settings);
                // console.log(res.json())

                try {
                    //get back data
                    let dat = await res.json();
                    console.log(dat)
                    // changeData(() => {
                    //     return dat;
                    // });
                    console.log(appData);
                } catch (error) {
                    //if there is an error in the connection log it with the data recieved
                    console.log("error", error, dat);
                }
            } catch (e) {
                return e;
            }



        } else {
            alert("Blank");
            return
        }



    }

    function AddTripClick() {
        let city = cityNameRef.current.value;
        console.log(city)
        callApi()
    }



    return (
        <div className="app">
            <Navbar />
            {/* <div onKeyDown={exitOverlay} className="content container">
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                    Launch demo modal
            </button>
                <Modal />
            </div> */}
            <Home/>
            <About/>
            <Planner btn={AddTripClick} r={cityNameRef}/>
            <Footer/>
        </div>
    );
}
export default App