import React from 'react'

import classes from './Register.css';

export default function Register() {
  return (
    <div className={classes.register}>
            <h1>Create account</h1>
            <form>  
              <input type="text" name='name' placeholder='Name' />
              <input type="text" name='surname' placeholder='Surname' />
              <input type="tel" name='phone' placeholder='Phone' />
              <input type="email" name="email" placeholder='Email' />
              <input type="password" name='password' placeholder='Password' />
              <button type='button'>Register</button>   
            </form>
        </div>
  )
}
