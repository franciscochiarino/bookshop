
import React from "react"
import App from "./components/home/App.js"
import reactDOM from "react-dom"
import { Provider } from 'react-redux';
import store from './store';
import './styles/main.scss'


reactDOM.render(<Provider store={store}><App/></Provider>,document.getElementById("root"))