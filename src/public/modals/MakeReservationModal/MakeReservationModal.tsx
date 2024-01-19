import React, { MouseEvent, useCallback, useContext, useEffect, useState } from 'react';
import {PuffLoader, SyncLoader} from "react-spinners";

import classes from "./MakeReservationModal.css";
import { ModalContext } from '../../components/Modal/Modal';

import dateImg from "../../assets/ui/date.svg";
import peopleImg from "../../assets/ui/people.svg";
import closeImg from "../../assets/ui/close.svg";
import { DateTime } from 'luxon';
import TableMap from '../../components/TableMap/TableMap';
import { GetTableMapEndpoint, TableMap as TableMapTypes } from '../../types/api';

interface IProps {
	selectedRestaurantID: number
}

export default function MakeReservationModal({selectedRestaurantID}: IProps) {
	const {closeModal} = useContext(ModalContext);

	const [date, setDate] = useState<string>("");
	const [timeSlot, setTimeSlot] = useState<string>("");
	const [tableSize, setTableSize] = useState<number>(0);
	const [selectedTable, setSelectedTable] = useState<number>(-1);
	const [tableMap, setTableMap] = useState<TableMapTypes.ITableMapDefinition | null>(null);
	const [tableAvailability, setTableAvailability] = useState<TableMapTypes.ITableAvailability[] | null>(null);

	const [fetchErr, setFetchErr] = useState<boolean>(false);
	const [paramsReady, setParamsReady] = useState<boolean>(false);
	const [canBook, setCanBook] = useState<boolean>(false);

	const mockTimeSlots = [
		"11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30",
		"16:00","16:30","17:00","17:30","18:00","18:30","19:00","19:30","20:00"
	];

	useEffect(()=>{
		setFetchErr(false);
		const aborter = new AbortController();

        new Promise<void>(async res=>{
			const response = await fetch(`/api/restaurantTableMap?id=${selectedRestaurantID}`, {signal: aborter.signal});

			if (response.ok) {
				const data = await response.json() as GetTableMapEndpoint.IResponse<"Success">;

				setTableMap(data.data);
			}else {
				const data = await response.json() as GetTableMapEndpoint.IResponse<"Failure">;
				setFetchErr(true);
				throw new Error(`Couldn't fetch restaurant table map. ErrCode: ${data.errCode}`);
			}
            res();
        });

        return ()=>aborter.abort();
	},[]);

	useEffect(()=>{
		setTableAvailability(null);
		setSelectedTable(-1);

		if(DateTime.fromISO(date).isValid&&timeSlot!="") {
			setTableAvailability([
				{id: 1, state: "Free"},
				{id: 2, state: "Free"},
				{id: 3, state: "Reserved"},
				{id: 4, state: "Free"},
				{id: 5, state: "Free"},
				{id: 6, state: "Free"},
				{id: 7, state: "Free"},
				{id: 8, state: "Free"},
				{id: 9, state: "Free"},
				{id: 10, state: "Free"}
			]);
			setParamsReady(true);
		}
	},[date,timeSlot]);

	useEffect(()=>{
		setSelectedTable(-1);
	},[tableSize]);

	useEffect(()=>{
		setCanBook(selectedTable!=-1);
	},[selectedTable]);


	const dateInputClickAction = useCallback((e: MouseEvent<HTMLInputElement>)=> {
		(e.target as HTMLInputElement).showPicker();
	},[]);

	return (
		<div className={classes.ModalWrapper}>
			<div className={classes.Header}>
				<button className={classes.CloseModalButton} onClick={closeModal}><img src={closeImg} alt="close" /></button>
			</div>
			{
				tableMap?
					<div className={classes.DefaultView}>
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
									paramsReady&&tableMap ?
										<TableMap tableMap={tableMap} availabilityData={tableAvailability ?? []} selectedTableID={selectedTable} setSelectedTableID={setSelectedTable} numOfPeople={tableSize}/>
									:
										<h4>Wybierz dzień oraz godzinę</h4>
								}
								{
									tableAvailability==null&&paramsReady?
										<div className={classes.LoadingCover}>
											<SyncLoader size="20px" color='var(--orange-color)' />
										</div>
									:""
								}
							</div>
						</div>
						<button className={classes.SubmitButton} disabled={!canBook}>Rezerwuj</button>
					</div>
				:
					fetchErr?
						<div className={classes.ErrorView}>
							<img src="/ilustrations/error.svg" alt='Fetch error'/>
							<h3>Coś poszło nie tak</h3>
						</div>
					:
						<div className={classes.LoadingView}>
							<PuffLoader size="160px" color='var(--orange-color)'/>
						</div>

			}
		</div>
	)
}
