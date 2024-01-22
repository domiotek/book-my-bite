import React, { MouseEvent, useContext, useEffect, useState } from 'react'

import classes from './Register.css';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../App';
import { SignUpEndpoint } from '../../types/api';

export default function Register() {

  const [appContext, setAppContext] = useContext(AppContext);
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [cpassword, setCPassword] = useState<string>("");
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

    if(password===cpassword) {
		try {
			const response = await fetch("/api/signup",{
				method: "POST",
				body: new URLSearchParams({email, password, name, surname, phone})
			});

			if(response.ok) {
				navigate("/Login");
				return;
			}else {
				const responseBody = await response.json() as SignUpEndpoint.IResponse<"Failure">;

				switch(responseBody.errCode) {
					case "UserSignedIn":
						const newCtx = Object.assign({},appContext);
						newCtx.isUserLoggedIn = true;
						setAppContext(newCtx);
						
						navigate("/Home");
					break;
					case "UserExists":
						setError("Email lub numer telefonu w użyciu.");
					break;
					case "InternalError":
						setError("Coś poszło nie tak, spróbuj ponownie.");
					break;
					default: 
						throw(new Error(responseBody.errCode));
				}
			}

		} catch (error) {
			console.error(error);
			setError("Coś jest nie tak. Spróbuj odświeżyć stronę.");   
		}
	}else setError("Hasła różnią się.");

	setPassword("");
	setCPassword("");
}

  return (
    <div className={classes.register}>
            <h1>Create account</h1>
            <form>  
              {error!=null&&<p className={classes.ErrorBox}>{error}</p>}
              <input type="text" placeholder='Name' required autoComplete='given-name' value={name} onChange={(e)=>setName(e.target.value)} />
              <input type="text" placeholder='Surname' required autoComplete='family-name' value={surname} onChange={(e)=>setSurname(e.target.value)} />
              <input type="tel" placeholder='Phone' required autoComplete='tel' value={phone} onChange={(e)=>setPhone(e.target.value)} />
              <input type="email" name="username" placeholder='Email' required autoComplete="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
              <input type="password" placeholder='Password' required autoComplete='new-password' value={password} onChange={(e)=>setPassword(e.target.value)} />
              <input type="password" placeholder='Confirm password' required autoComplete='new-password' value={cpassword} onChange={(e)=>setCPassword(e.target.value)} />
              <button type='button' onClick={clickCallback}>Register</button>
            </form>
        </div>
  )
}
