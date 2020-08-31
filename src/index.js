import regeneratorRuntime from "regenerator-runtime";
import React from 'react';
import ReactDOM from 'react-dom';
// import client from "./public/client"

import App from "./components/App";

import './styles/style.scss'


document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render( <App />, document.getElementById('root') );
  });


