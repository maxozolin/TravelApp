
/* Empty JS object to act as endpoint for all routes */
projectData = {};

/* Express to run server and routes */
const express = require('express');

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
app.use(express.static(path.join(__dirname, '..', 'dist')));

const port = 5000;

const dotenv = require('dotenv');
dotenv.config();
/* Spin up the server*/
const server = app.listen(port);

//Logging start time
console.log(`sever started at ${Math.floor(new Date() / 1000)} port ${port}`);

const GEONAME_USER = process.env.GEONAME_USER;
const WEATHERBIT_KEY = process.env.WEATHERBIT_KEY;
const PIXABAY_KEY = process.env.PIXABAY_KEY;

console.log(GEONAME_USER, WEATHERBIT_KEY, PIXABAY_KEY)

app.post('/api/app', function (req, resp) {
    let allApiData = {}
    let resApiData = {}

    //Get userdata
    let udata = req.body
    //Get the city from userdata
    let city = udata["city"]
    //Logging with UTC timestamp time
    console.log(`requested ${city}`)

    let geonameUrl = `http://api.geonames.org/searchJSON?username=${GEONAME_USER}&maxRows=1&q=${city}`
    let weatherbitUrl = `https://api.weatherbit.io/v2.0/current?key=${WEATHERBIT_KEY}&city=${city}`
    let pixabayUrl = `https://pixabay.com/api/?key=${PIXABAY_KEY}&per_page=3&q=${city}`

    let promises = {}

    function parseApiData(){
        resApiData = Object.assign({}, allApiData)

        let error

        if(allApiData.geoname.totalResultsCount==0){
            error = Object.assign({}, error, {"geoname":"location not found"})
        }
        if(allApiData.pixabay.total==0){
            error = Object.assign({}, error, {"pixabay":"image not found"})
        }
        if(!allApiData.weatherbit){
            error =  Object.assign({}, error, {"weatherbit":"no weather data"})
        }
        if(error){
            resApiData.error=error
        }
    }


    promises["geoname_weatherbit"] = new Promise((resolve, reject) => {

        request(geonameUrl, { json: true }, (err, res, body) => {

            if (err) { reject("error"); return console.log(err); }

            allApiData["geoname"] = res.body;
            try{
                weatherbitUrl = `https://api.weatherbit.io/v2.0/current?key=${WEATHERBIT_KEY}&city=${allApiData.geoname.geonames[0].name}`

            }catch(e){
                weatherbitUrl = `https://api.weatherbit.io/v2.0/current?key=${WEATHERBIT_KEY}&city=${city}`

            }

            request(weatherbitUrl, { json: true }, (err, res, body) => {

                if (err) { reject("error"); return console.log(err); }

                allApiData["weatherbit"] = res.body;

                resolve()

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
    })

    promises["pixabay"] = new Promise((resolve, reject) => {
        request(pixabayUrl, { json: true }, (err, res, body) => {
            if (err) { reject("error"); return console.log(err); }
            allApiData["pixabay"] = res.body;
            resolve()
            try {
                // console.log(allApiData)
            } catch (e) {
                console.log(e)
                reject("error")
            }
        })
    })

    Promise.all([promises["geoname_weatherbit"], promises["pixabay"]]).then((values) => {
        parseApiData();
        console.log(resApiData);
        resp.send(resApiData)
    });


})

