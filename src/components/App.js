import React, { useState, useEffect, useRef, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid'
import Modal from './Modal'
import Navbar from './Navbar'
import Home from './Home';
import About from './About';
import Planner from './Planner'
import Footer from './Footer'
import {ModalContext, ModalProvider} from './ModalContext'
import { uuid } from 'uuidv4';

const LOCAL_STORAGE_KEY = 'websiteApp.appData'

function App() {

    const [appData, changeData] = useState({
        "planner": {
            "loading": false,
            "trips": []
        }
    })



    const cityNameRef = useRef();
    const dateRef = useRef();
    const randomRef = useRef();


    useEffect(() => {
        const appData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        if (appData) changeData(appData)
    }, [])

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(appData));
    }, [appData])



    let callApi = async () => {
        let city = cityNameRef.current.value;
        let date = dateRef.current.value;
        // console.log(date)
        if (city == "") {
            alert("city blank")
            return
        }
        if (date == "") {
            alert("date blank")
            return
        }

        TogglePlannerLoading()


        const settings = {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "city": city, "date": date })
        };
        try {
            //Post coords to server
            const res = await fetch(`/api/app`, settings);
            // console.log(res)
            if (res.status.toString()[0] == 5) {
                console.log("NOT RESPONDING")
                alert(res.statusText)
            }
            TogglePlannerLoading()



            try {
                //get back data
                let dat = await res.json();
                console.log(dat)

                changeData((prev) => {
                    let newData = Object.assign({}, prev)
                    dat = Object.assign({}, dat, { "id": uuidv4() })
                    newData.planner.trips.push(dat)
                    newData.planner.trips.sort((a, b) => {
                        let d1 = new Date(a.date)
                        let d2 = new Date(b.date)
                        return d1 - d2
                    })
                    return newData
                })
                // changeData(() => {
                //     return dat;
                // });
                // console.log(appData);
            } catch (error) {
                //if there is an error in the connection log it with the data recieved
                console.log("error", error);
            }
        } catch (e) {
            return e;
        }





    }

    function TogglePlannerLoading() {
        changeData((prev) => {
            let toggled = Object.assign({}, prev)
            toggled.planner.loading = !toggled.planner.loading;
            // console.log("toggled:  ",toggled)
            return toggled
        })
    }
    function AddTripClick() {
        callApi()
    }

    function RandomClick() {
        console.log(appData)
        console.log(uuidv4())


    }



    return (
        <div className="app">
            <ModalProvider>
            <Navbar />
            <Home />
            <About />
            <Modal data={{"trips":appData.planner.trips, "changeData":changeData}}/>
            <Planner btn={{ AddTripClick, RandomClick}} refs={{ cityNameRef, dateRef }} loading={appData.planner.loading} trips={appData.planner.trips} />
            <Footer />
            </ModalProvider>
        </div>
    );
}
export default App