
import React from "react"
import { Provider as AlertProvider, positions, transitions } from "react-alert"
import App from "./components/home/App.js"
import reactDOM from "react-dom"
import { Provider } from 'react-redux';
import store from './store';
import './styles/main.scss'

const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 3000,
  offset: '10px',
  transition: transitions.SCALE,
}

const alertStyle = {
  backgroundColor: '#000',
  color: '#fff',
  fontSize: '20px',
  boxShadow: '0 8px 12px 0 rgba(0,0,0,0.3)',
  padding: '20px',
  textTransform: 'none',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '350px',
  height: "auto",
  border: "1px solid #000",
  boxSizing: 'border-box',
  borderRadius: "5px",
}

const buttonStyle = {
  backgroundColor: '#000',
  color: '#eee',
  border: 'none',
  cursor: 'pointer',
}

const AlertTemplate = ({ style, options, message, close }) => (
  <div style={{ ...alertStyle, ...style }}>
    {options.type === 'info' && ''}
    {options.type === 'success' && ''}
    {options.type === 'error' && ''}
    {message}
    <button onClick={close} style={buttonStyle}>close</button>
  </div>
)



reactDOM.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <App/>
    </AlertProvider>
  </Provider>
,document.getElementById("root"))