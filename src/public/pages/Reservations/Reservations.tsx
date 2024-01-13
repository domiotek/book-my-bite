import React from 'react'
import { DateTime } from 'luxon';
import locationImg from "../../assets/ui/location-orange.svg";
import deleteImg from '../../assets/ui/delete.svg';

import classes from './Reservations.css';

export default function Reservations() {
  const mockReservatons = [
    {
      id: 1,
      name: 'Tomasza 20 Restro Bar',
      location: 'Kraków, Świętego Tomasza 20',
      datetime: DateTime.fromObject({day: 15, month: 1, year: 2024, minute: 0, hour: 14}).toFormat('dd-MM-yyyy HH:mm'),
    },
    {
      id: 2,
      name: 'Tomasza 20 Restro Bar',
      location: 'Kraków, Świętego Tomasza 20',
      datetime: DateTime.fromObject({day: 16, month: 1, year: 2024, minute: 30, hour: 12}).toFormat('dd-MM-yyyy HH:mm'),
    },
    {
      id: 3,
      name: 'Tomasza 20 Restro Bar',
      location: 'Kraków, Świętego Tomasza 20',
      datetime: DateTime.fromObject({day: 17, month: 1, year: 2024, minute: 0, hour: 18}).toFormat('dd-MM-yyyy HH:mm'),
    },
  ]

  return (
    <div className={classes.reservations}>
      <div className={classes.header}>
        <h2>Twoje rezerwacje: </h2>
      </div>
      {
        mockReservatons.map((reservation) => (
          <div key={reservation.id} className={classes.reservation}>
            <div className={classes.restaurantInfo}>
              <h3>{reservation.name}</h3>
              <p>
                <img src={locationImg} alt="location" />
                <span>{reservation.location}</span>
              </p>
            </div>
            <h3>{reservation.datetime}</h3>
            <button type='button'><img src={deleteImg} alt="delete" /></button>
          </div>
        ))
      }
    </div>
  )
}
