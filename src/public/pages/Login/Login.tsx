import React, { useCallback, useContext } from 'react'
import { AppContext } from '../../App';

export default function Login() {

    const [appContext, setAppContext]  =  useContext(AppContext);

    const clickCallback = useCallback(()=>{
        const newCtx = Object.assign({},appContext);
        newCtx.isUserLoggedIn = true;
        setAppContext(newCtx);
    },[]);

    return (
        <>
            Login
            <button onClick={clickCallback}>Login</button>   
        </>
    )
}
