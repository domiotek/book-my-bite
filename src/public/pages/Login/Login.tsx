import React, { useCallback, useContext } from 'react'
import { AppContext } from '../../App';

import classes from "./Login.css";

export default function Login() {

    const [appContext, setAppContext]  =  useContext(AppContext);

    const clickCallback = useCallback(()=>{
        const newCtx = Object.assign({},appContext);
        newCtx.isUserLoggedIn = true;
        setAppContext(newCtx);
    },[]);

    return (
        <div className={classes.login}>
            <h1>Log into our service</h1>
            <input type="email" name="email" placeholder='Email' />
            <input type="password" name='password' placeholder='Password' />
            <button onClick={clickCallback}>Login</button>   
        </div>
    )
}
