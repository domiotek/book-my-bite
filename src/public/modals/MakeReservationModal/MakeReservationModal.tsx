import React, { MouseEvent, useCallback, useContext, useEffect, useState } from 'react'

import classes from "./MakeReservationModal.css";
import { ModalContext } from '../../components/Modal/Modal';

import dateImg from "../../assets/ui/date.svg";
import peopleImg from "../../assets/ui/people.svg";
import closeImg from "../../assets/ui/close.svg";
import { DateTime } from 'luxon';
import TableMap from '../../components/TableMap/TableMap';
import { TableMap as TableMapTypes } from '../../types/api';

export default function MakeReservationModal() {
	const {closeModal} = useContext(ModalContext);

	const [date, setDate] = useState<string>("");
	const [timeSlot, setTimeSlot] = useState<string>("");
	const [tableSize, setTableSize] = useState<number>(0);
	const [selectedTable, setSelectedTable] = useState<number>(-1);
	const [tableMap, setTableMap] = useState<TableMapTypes.ITableMapDefinition | null>(null);

	const [paramsReady, setParamsReady] = useState<boolean>(false);

	const mockTimeSlots = [
		"11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30",
		"16:00","16:30","17:00","17:30","18:00","18:30","19:00","19:30","20:00"
	]

	useEffect(()=>{
		if(DateTime.fromISO(date).isValid&&timeSlot!="") {
			//hit API, fetch tables and render them
			setTableMap( {
				"width": 800,
				"height": 600,
				"tables": [
					{ "id": 0, "type": "Rect", "name": "A1", "x": 10, "y": 100, "width": 140, "height": 80, minPeople: 3, maxPeople: 4 },
					{ "id": 1, "type": "Rect", "name": "A2", "x": 10, "y": 255, "width": 140, "height": 80, minPeople: 3, maxPeople: 4 },
					{ "id": 2, "type": "Rect", "name": "A3", "x": 10, "y": 410, "width": 140, "height": 80, minPeople: 3, maxPeople: 4 },
					{ "id": 3, "type": "Rect", "name": "B1", "x": 360, "y": 100, "width": 80, "height": 80, minPeople: 1, maxPeople: 2 },
					{ "id": 4, "type": "Rect", "name": "B2", "x": 275, "y": 255, "width": 80, "height": 80, minPeople: 1, maxPeople: 2 },
					{ "id": 5, "type": "Rect", "name": "B3", "x": 445, "y": 255, "width": 80, "height": 80, minPeople: 1, maxPeople: 2 },
					{ "id": 6, "type": "Rect", "name": "B4", "x": 360, "y": 410, "width": 80, "height": 80, minPeople: 1, maxPeople: 2 },
					{ "id": 7, "type": "Rect", "name": "B5", "x": 360, "y": 565, "width": 80, "height": 80, minPeople: 1, maxPeople: 2 },
					{ "id": 8, "type": "Rect", "name": "C1", "x": 650, "y": 100, "width": 140, "height": 80, minPeople: 3, maxPeople: 4 },
					{ "id": 9, "type": "Rect", "name": "C2", "x": 650, "y": 255, "width": 140, "height": 80, minPeople: 3, maxPeople: 4 },
					{ "id": 10, "type": "Rect", "name": "C3", "x": 650, "y": 410 , "width": 140, "height": 80, minPeople: 3, maxPeople: 4 },
				],
				"decors": [
					{"x": 360, "y": 185, "width": 80, "height": 220},
					{"x": 160, "y": 10, "width": 115, "height": 30, "label": "Drzwi"},
					{"x": 530, "y": 10, "width": 115, "height": 30, "label": "Drzwi"},
					{"x": 30, "y": 615, "width": 110, "height": 30, "label": "WC"},
					{"x": 555, "y": 615, "width": 110, "height": 30, "label": "TV"}
				]
			});
			setParamsReady(true);
		}
	},[date,timeSlot]);


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
					{
						tableMap ?
							<TableMap tableMap={tableMap} selectedTableID={selectedTable} setSelectedTableID={setSelectedTable} numOfPeople={tableSize}/>
						:
							<h4>Wybierz dzień oraz godzinę</h4>
					}
					
				</div>
			</div>
			<button className={classes.SubmitButton}>Rezerwuj</button>
		</div>
	)
}
