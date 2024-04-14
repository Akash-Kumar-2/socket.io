import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import axios from 'axios'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
axios.defaults.baseURL='http://localhost:5000';
axios.defaults.withCredentials = true;

const router = createBrowserRouter([{
  path:'/',
  element:<App/>
},

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
    {/* <App /> */}
  </React.StrictMode>,
)
