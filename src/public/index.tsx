import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from "react-router-dom";

import './index.css';
import App from './App';

const Home = React.lazy(()=>import("./pages/Home/Home"));
const Login = React.lazy(()=>import("./pages/Login/Login"));
const ManageRestaurant = React.lazy(()=>import("./pages/ManageRestaurant/ManageRestaurant"));
const Register = React.lazy(()=>import("./pages/Register/Register"));
const Reservations = React.lazy(()=>import("./pages/Reservations/Reservations"));
const Restaurant = React.lazy(()=>import("./pages/Restaurant/Restaurant"));
const Restaurants = React.lazy(()=>import("./pages/Restaurants/Restaurants"));


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <BrowserRouter>
        <Routes>
			<Route path='/' element={<App />}>
				<Route path='/' element={<Home />} />
				<Route index path='/Home' element={<Home />} />
				<Route path='/Login' element={<Login />} />
				<Route path='/ManageRestaurant' element={<ManageRestaurant />} />
				<Route path='/Register' element={<Register />} /> 
				<Route path='/Reservations' element={<Reservations />} />
				<Route path='/Restaurant' element={<Restaurant />} />
				<Route path='/Restaurants' element={<Restaurants />} />
			</Route>
		</Routes>
    </BrowserRouter>
  </React.StrictMode>
);
