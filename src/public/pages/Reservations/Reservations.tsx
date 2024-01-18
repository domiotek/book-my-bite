import React, { useContext, useEffect, useState } from 'react'
import { DateTime } from 'luxon';
import locationImg from "../../assets/ui/location-orange.svg";
import deleteImg from '../../assets/ui/delete.svg';

import classes from './Reservations.css';
import { Reservation } from '../../types/api';

export default function Reservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    const aborter = new AbortController();

    new Promise<void>(async res=>{
        try {
            const response = await fetch(`/api/userBookings`, {signal: aborter.signal});

            if (!response.ok) {
                console.log('Cannot reach reservations response');
                return;
            }

            const data = await response.json();
            setReservations(data.bookings);
        } catch (e) {
            console.log('Error in fetch reservations operation: ', e);
        }

        res();
    });

    return ()=>aborter.abort();
  }, []);

  async function deleteReservation(id: number) {
    
    if (!confirm('Are you sure to cancel this reservation? ')) {
      return;
    }

    try {
      const response = await fetch(`/api/deleteBooking/${id}`, {method: 'DELETE'});

      if (!response.ok) {
        console.log('Cannot reach canceling reservation response');
        return;
      }

      const data = await response.json();

      if (!data.deleted) {
        alert('Przepraszamy, nie udało się anulować rezerwacji, spróbuj ponownie później');
        return;
      }

      setReservations(reservations.filter((reservation => reservation.id !== id)));

    } catch (e) {
      console.log('Error in canceling reservation: ', e);
    }
  }

  return (
    <div className={classes.reservations}>
      <div className={classes.header}>
        <h2>Twoje rezerwacje: </h2>
      </div>
      {
        reservations.map((reservation) => (
          <div key={reservation.id} className={classes.reservation}>
            <div className={classes.restaurantInfo}>
              <h3>{reservation.restaurantName}</h3>
              <p>
                <img src={locationImg} alt="location" />
                <span>{reservation.location}</span>
              </p>
            </div>
            <h3>{reservation.datetime}</h3>
            <button type='button'><img src={deleteImg} alt="delete" onClick={() => deleteReservation(reservation.id)} /></button>
          </div>
        ))
      }
    </div>
  )
}
