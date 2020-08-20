import React, { useState, useEffect, useRef } from 'react';
import uuid from 'uuid'

const LOCAL_STORAGE_KEY = 'websiteApp.appData'

function App() {

    const [appData, changeData] = useState(undefined)
    const websiteNameRef = useRef()


    useEffect(() => {
        if (localStorage.getItem(LOCAL_STORAGE_KEY) == "undefined") return
        const storedAppData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        if (storedAppData) changeData(storedAppData)
    }, [])

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(appData));
    }, [appData])


    let callApi = async (e) => {
        e.preventDefault()
        let url = websiteNameRef.current.value;

        if (url!=="") {
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
                    changeData(() => {
                        return dat;
                    });
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

    return (
        <>
            <form className="col-md-7 mr-auto ml-auto">
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Website</label>
                    <input type="text" className="form-control" id="websiteInput" aria-describedby="websiteInput" ref={websiteNameRef} />
                    <small id="emailHelp" className="form-text text-muted">Enter the webite to be examined</small>
                </div>
                <button className="btn btn-primary" onClick={callApi}>Submit</button>
            </form>
        </>
    );
}
export default App