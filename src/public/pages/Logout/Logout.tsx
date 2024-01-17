import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../App';

export default function Logout() {
	const [appContext, setAppContext] = useContext(AppContext);
	const navigate = useNavigate();

	useEffect(()=>{
		fetch("/api/signout");

		const newCtx = Object.assign({},appContext);
		newCtx.isUserLoggedIn = false;
		setAppContext(newCtx);

		navigate("/Home");
	},[]);

	return (<></>)
}
