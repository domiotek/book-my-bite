import React from "react";
import emptyImg from '../../assets/ui/empty.svg';

import classes from './NoData.css';

export default function NoData() {

    return (
        <div className={classes.noData}>
            <img src={emptyImg} alt="empty" />
            <p>Brak rezerwacji</p>
        </div>
    )
}