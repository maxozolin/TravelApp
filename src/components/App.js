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
    const websiteNameRef = useRef()


    // useEffect(() => {
    //     if (localStorage.getItem(LOCAL_STORAGE_KEY) == "undefined") return
    //     const storedAppData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    //     if (storedAppData) changeData(storedAppData)
    // }, [])

    // useEffect(() => {
    //     localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(appData));
    // }, [appData])


    let callApi = async (e) => {
        e.preventDefault()
        let url = websiteNameRef.current.value;

        if (url !== "") {
            const settings = {
                method: 'post',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "url": url })
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
            alert("Not a website");
            return
        }



    }
    function exitOverlay(e) {
        if (appData.OverlayActive == true) {
            console.log(e.keyCode)
            if (e.keyCode == 27) {
                changeShow()
            }
        }
    }

    function changeShow(e) {
        if (e) { e.preventDefault() }

        changeData((data) => {
            let d = Object.assign({}, data)

            console.log(d)
            d.OverlayActive = !data.OverlayActive
            console.log(d)
            return d
        })
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
            <Planner/>
            <Footer/>
        </div>
    );
}
export default App