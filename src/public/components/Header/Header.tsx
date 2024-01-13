import React from "react";
import { Link } from "react-router-dom";

import classes from "./Header.css";

import menuImg from "../../assets/ui/menu.png";

interface IProps {
    links: Array<{displayName: string, to: string}>
    navStateToggler: ()=>void
}

export default function Header({links, navStateToggler}: IProps) {

    return (
        <header className={classes.Wrapper}>
            <h3>BookMyBite</h3>
            
            <button onClick={navStateToggler}>
                <img src={menuImg} alt="Menu" />
            </button>
            <nav className={classes.LinksContainer}>
                {
                    links.map((link, i)=>
                        <Link key={i} to={link.to}>{link.displayName}</Link> 
                    )
                }
            </nav>
        </header>
    )
}