import React, { MouseEvent, useContext, useEffect, useState } from 'react'
import { AppContext } from '../../App';

import classes from "./Login.css";
import { useNavigate } from 'react-router-dom';
import { SignInEndpoint } from '../../types/api';

export default function Login() {
    const [appContext, setAppContext] = useContext(AppContext);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    useEffect(()=>{
        if(appContext.isUserLoggedIn) navigate("/home");
    },[]);

    const clickCallback = async (e: MouseEvent<HTMLButtonElement>)=>{
        setError(null);
        const isFormValid = (e.target as HTMLButtonElement).closest("form")?.reportValidity();

        if(!isFormValid) {
            return;
        }

        try {
            const response = await fetch("/api/signin",{
                method: "POST",
                body: new URLSearchParams({email, password})
            });

            if(response.ok) {
                const newCtx = Object.assign({},appContext);
                newCtx.isUserLoggedIn = true;
                setAppContext(newCtx);
                
                navigate("/home");
            }else {
                const responseBody = await response.json() as SignInEndpoint.IResponse<"Failure">;

                switch(responseBody.errCode) {
                    case "AlreadySignedIn":
                        const newCtx = Object.assign({},appContext);
                        newCtx.isUserLoggedIn = true;
                        setAppContext(newCtx);
                        
                        navigate("/home");
                    break;
                    case "InvalidCredentials":
                        setError("Niepoprawne dane logowania");
                    break;
                    case "DBError":
                        setError("Coś poszło nie tak, spróbuj ponownie.");
                    break;
                }

                setPassword("");
            }
        } catch (error) {
            console.error(error);
            setError("Coś jest nie tak. Spróbuj odświeżyć stronę.");   
        }
    }

    return (
        <div className={classes.login}>
            <h1>Log into our service</h1>
            <form>
                {error!=null&&<p className={classes.ErrorBox}>{error}</p>}
                <input type="email" name="username" placeholder='Email' autoComplete='username' required value={email} onChange={e=>setEmail(e.target.value)}/>
                <input type="password" name='password' placeholder='Password' autoComplete='current-password' required value={password} onChange={e=>setPassword(e.target.value)}/>
                <button onClick={clickCallback} type='button'>Login</button>   
            </form>
        </div>
    )
}
