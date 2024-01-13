import React from 'react';
import { Link } from 'react-router-dom';

import classes from "./FullscreenNav.css";

interface IProps {
    links: Array<{displayName: string, to: string}>
    openState: boolean
    hideNav: ()=>void
}

export default function FullscreenNav({links, openState, hideNav}: IProps) {
  return (
    <nav className={`${classes.FullscreenNav} ${openState?classes.Shown:""}`}>
        {
            links.map((link, i)=>
                <Link key={i} to={link.to} onClick={hideNav}>{link.displayName}</Link> 
            )
        }
    </nav>
  )
}
