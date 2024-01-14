import React, { MouseEvent, MouseEventHandler, useCallback, useContext, useEffect, useState } from 'react'

import classes from "./MakeReservationModal.css";
import { ModalContext } from '../../components/Modal/Modal';

import dateImg from "../../assets/ui/date.svg";
import peopleImg from "../../assets/ui/people.svg";
import closeImg from "../../assets/ui/close.svg";
import { DateTime } from 'luxon';

export default function MakeReservationModal() {
	const {closeModal} = useContext(ModalContext);

	const [date, setDate] = useState<string>("");
	const [timeSlot, setTimeSlot] = useState<string>("");
	const [tableSize, setTableSize] = useState<number>(0);

	const [paramsReady, setParamsReady] = useState<boolean>(false);

	const mockTimeSlots = [
		"11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30",
		"16:00","16:30","17:00","17:30","18:00","18:30","19:00","19:30","20:00"
	]

	useEffect(()=>{
		if(DateTime.fromISO(date).isValid&&timeSlot!=""&&tableSize>0) {
			//hit API, fetch tables and render them
			setParamsReady(true);
		}
	},[date,timeSlot,tableSize]);


	const dateInputClickAction = useCallback((e: MouseEvent<HTMLInputElement>)=> {
		(e.target as HTMLInputElement).showPicker();
	},[]);

	return (
		<div className={classes.ModalWrapper}>
			<div className={classes.Header}>
				<button className={classes.CloseModalButton} onClick={closeModal}><img src={closeImg} alt="close" /></button>
			</div>


			<div className={classes.ReservationPanel}>
				<div className={classes.ReservationDetails}>
					<div className={classes.InputWrapper}>
						<img src={dateImg} alt="People" />
						<input type="date" placeholder='Data' onClick={dateInputClickAction} value={date} onChange={e=>setDate(e.target.value)}/>
					</div>
					<div className={classes.HourPicker}>
						{
							mockTimeSlots.map(hour=>
								<span key={hour} className={timeSlot==hour?classes.Selected:""} onClick={()=>setTimeSlot(hour)}>{hour}</span>
							)
						}
					</div>
					<div className={classes.InputWrapper}>
						<img src={peopleImg} alt="People" />
						<input type="number" placeholder='Ilość osób' min={0} value={tableSize} onChange={e=>setTableSize(parseInt(e.target.value!=""?e.target.value:"0"))}/>
					</div>
				</div>
				<div className={classes.TableMapContainer}>
					<h4>{paramsReady?"Wybierz stolik":""}</h4>
				</div>
			</div>
			<button className={classes.SubmitButton}>Rezerwuj</button>
		</div>
	)
}
