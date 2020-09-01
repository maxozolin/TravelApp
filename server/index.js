
/* Empty JS object to act as endpoint for all routes */
projectData = {};

/* Express to run server and routes */
const express = require('express');

const fs = require('fs');

const request = require('request');

const path = require('path')
/* Start up an instance of app */
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')
/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

/* Initialize the main project folder*/
const root = path.normalize(`${__dirname}/..`)
app.use(express.static(path.join(root, 'dist')));
app.use('/ServerImages', express.static(path.join(root, 'ServerImages')));
app.use('/Images', express.static(path.join(root, 'Images')));

const functions = require('../functions/functions')


const port = 5000;

const dotenv = require('dotenv');
dotenv.config();
/* Spin up the server*/
const server = app.listen(port);

//Logging start time
console.log(`sever started at ${Math.floor(new Date() / 1000)} port ${port}\n`);

const GEONAME_USER = process.env.GEONAME_USER;
const WEATHERBIT_KEY = process.env.WEATHERBIT_KEY;
const PIXABAY_KEY = process.env.PIXABAY_KEY;


app.post('/api/app', function (req, resp) {
    
    let allApiData = {}
    let resApiData = {}
    
    //Get userdata
    let udata = req.body
    //Get the city from userdata
    let city = udata["city"]
    let date = udata["date"]
    //Logging with UTC timestamp time
    
    console.log(`New Trip Request: ${city}, ${date}`)
    
    let geonameUrl = `http://api.geonames.org/searchJSON?username=${GEONAME_USER}&maxRows=1&q=${city}`
    let weatherbitUrl = `https://api.weatherbit.io/v2.0/current?key=${WEATHERBIT_KEY}&city=${city}`
    let pixabayUrl = `https://pixabay.com/api/?key=${PIXABAY_KEY}&per_page=3&q=${city}`






    function parseApiData() {
        let error
        resApiData.date = date
        if (allApiData.geoname.totalResultsCount !== 0) {
            resApiData.geoname = {
                "country": allApiData.geoname.geonames[0].countryName,
                "name": allApiData.geoname.geonames[0].name
            }
        }
        else {
            error = Object.assign({}, error, { "geoname": "location not found" })
        }

        if (allApiData.pixabay.total !== 0) {
            resApiData.pixabay = allApiData.pixabay.hits.map((hit) => {
                return `/ServerImages/${hit.id.toString()}.jpg`
            });

        } else {
            error = Object.assign({}, error, { "pixabay": "image not found" })
        }

        if (allApiData.weatherbit) {

            resApiData.weatherbit = {
                "temp": allApiData.weatherbit.data[0].temp,
                "weather": allApiData.weatherbit.data[0].weather
            }
        }


        else {
            error = Object.assign({}, error, { "weatherbit": "no weather data" })
        }

        if (error) {
            resApiData.error = error
        }
    }


    apiPromise = new Promise((resolve, reject) => {

        let promises = {}
        request(geonameUrl, { json: true }, (err, res, body) => {

            if (err) { console.log(err); reject("error"); }

            allApiData["geoname"] = res.body;
            console.log(" Geoname returned")
            try {
                weatherbitUrl = `https://api.weatherbit.io/v2.0/current?key=${WEATHERBIT_KEY}&city=${allApiData.geoname.geonames[0].name}`
                pixabayUrl = `https://pixabay.com/api/?key=${PIXABAY_KEY}&per_page=3&q=${allApiData.geoname.geonames[0].name}+${allApiData.geoname.geonames[0].countryName}`

            } catch (e) {
                weatherbitUrl = `https://api.weatherbit.io/v2.0/current?key=${WEATHERBIT_KEY}&city=${city}`

            }
            promises.weatherbit = new Promise((resolveTwo, rejectTwo) => {
                request(weatherbitUrl, { json: true }, (err, res, body) => {

                    if (err) { reject("error"); return console.log(err); }

                    allApiData["weatherbit"] = res.body;
                    console.log("  Weatherbit returned")


                    resolveTwo()

                    try {
                        // console.log(allApiData)
                    } catch (e) {

                        console.log(e)

                        reject("error")
                    }
                })
                try {
                    // console.log(allApiData)
                } catch (e) {
                    console.log(e)
                    reject("error")
                }
            })
            promises.pixabay = new Promise((resolveThree, rejectThree) => {
                request(pixabayUrl, { json: true }, (err, res, body) => {
                    if (err) { reject("error"); return console.log(err); }
                    allApiData["pixabay"] = res.body
                    // console.log(res.body)
                    console.log("  Pixabay returned")

                    let promises = []
                    let i =0
                    res.body.hits.map((hit)=>{
                        // console.log(hit);
                        let promise= new Promise((r,f)=>{
        
                        
                        functions.Download(fs, request, hit.largeImageURL, `./ServerImages/${hit.id}.jpg`, r );
                        i++
                        })
                        promises.push(promise)
                    })
        
                    Promise.all(promises).then(()=>{resolveThree()})
                   
                    try {
        
                        // console.log(allApiData)
                    } catch (e) {
                        console.log(e)
                        reject("error")
                    }
                })
            })

            Promise.all([promises.weatherbit, promises.pixabay]).then(()=>{
                console.log("\n All apis returned\n")
                resolve()
            })

        })
    })



    apiPromise.then((values) => {
        parseApiData();
        console.log(" Data parsed")
        // console.log(resApiData);
        console.log(" Sending back data\n\n")
        resp.send(resApiData)
    });


})

