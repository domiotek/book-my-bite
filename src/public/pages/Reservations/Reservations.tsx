import React, { useEffect, useState } from 'react'
import locationImg from "../../assets/ui/location-orange.svg";
import deleteImg from '../../assets/ui/delete.svg';

import classes from './Reservations.css';
import { DeleteBookingEndpoint, GetUserBookingsEndpoint} from '../../types/api';
import NoData from '../../components/NoData/NoData';

export default function Reservations() {
  const [reservations, setReservations] = useState<GetUserBookingsEndpoint.IBookingData[]>([]);

  useEffect(() => {
    const aborter = new AbortController();

    new Promise<void>(async res=>{
        try {
            const response = await fetch(`/api/userBookings`, {signal: aborter.signal});

            if (!response.ok) {
				const result = await response.json() as DeleteBookingEndpoint.IResponse<"Failure">;

				console.error(`Couldn't get user reservations. ErrCode: ${result.errCode}`);
                return;
            }

            const data = await response.json() as GetUserBookingsEndpoint.IResponse<"Success">;
            setReservations(data.data);
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
      const response = await fetch(`/api/booking/${id}`, {method: 'DELETE'});

      if (!response.ok) {
        alert('Przepraszamy, nie udało się anulować rezerwacji, spróbuj ponownie później');

        const result = await response.json() as DeleteBookingEndpoint.IResponse<"Failure">;

        console.error(`Couldn't cancel reservation. ErrCode: ${result.errCode}`);
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
        reservations.length === 0 ? (
          <NoData />
        ) :
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
