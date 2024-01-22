import React, { MouseEvent, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {PuffLoader, SyncLoader} from "react-spinners";

import classes from "./MakeReservationModal.css";
import { ModalContext } from '../../components/Modal/Modal';

import dateImg from "../../assets/ui/date.svg";
import peopleImg from "../../assets/ui/people.svg";
import closeImg from "../../assets/ui/close.svg";
import { DateTime } from 'luxon';
import TableMap from '../../components/TableMap/TableMap';
import { CreateReservationEndpoint, GetTableAvailabilityEndpoint, GetTableMapEndpoint, TableMap as TableMapTypes } from '../../types/api';

interface IProps {
	selectedRestaurantID: number
}


interface IDefaultViewProps {
	setBookComplete: (state: boolean)=>void
	setErrMessage: (msg: string | null)=>void
	restaurantID: number
	tableMap: TableMapTypes.ITableMapDefinition
}

export default function MakeReservationModal({selectedRestaurantID}: IProps) {
	const {closeModal} = useContext(ModalContext);

	const [tableMap, setTableMap] = useState<TableMapTypes.ITableMapDefinition | null>(null);

	const [fetchErr, setFetchErr] = useState<boolean>(false);
	const [errMessage, setErrMessage] = useState<string | null>(null);

	const [bookComplete, setBookComplete] = useState<boolean>(false);

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

	return (
		<div className={classes.ModalWrapper}>
			<div className={classes.Header}>
				<button className={classes.CloseModalButton} onClick={closeModal}><img src={closeImg} alt="close" /></button>
				{
					errMessage?<p className={classes.ErrorMessage}>{errMessage}</p>:""
				}
			</div>
			{
				bookComplete?
					<div className={classes.SuccessView}>
						<img src="/ilustrations/complete.svg" alt='Proccess complete'/>
						<h3>Wszystko gotowe!</h3>
						<button type="button" onClick={closeModal}>Zamknij</button>
					</div>
				:
					tableMap?
						<DefaultView setBookComplete={setBookComplete} setErrMessage={setErrMessage} restaurantID={selectedRestaurantID} tableMap={tableMap}/>
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


function DefaultView({setBookComplete, setErrMessage, restaurantID, tableMap}: IDefaultViewProps) {

	const [date, setDate] = useState<string>("");
	const [timeSlot, setTimeSlot] = useState<string>("");
	const [tableSize, setTableSize] = useState<number>(0);
	const [selectedTable, setSelectedTable] = useState<number>(-1);

	const [tableAvailability, setTableAvailability] = useState<TableMapTypes.ITableAvailability[] | null>(null);
	const [fetchErr, setFetchErr] = useState<boolean>(false);
	const [paramsReady, setParamsReady] = useState<boolean>(false);
	const [canBook, setCanBook] = useState<boolean>(false);

	const mockTimeSlots = [
		"11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30",
		"16:00","16:30","17:00","17:30","18:00","18:30","19:00","19:30","20:00"
	];

	const targetDateTime = useMemo(()=>{
		const targetDate = DateTime.fromISO(date);

		if(timeSlot==""||!targetDate.isValid) return DateTime.invalid("Missing components");

		const [hour, minute] = timeSlot.split(":");
		return DateTime.fromObject({day: targetDate.day, month: targetDate.month, year: targetDate.year, hour: parseInt(hour), minute: parseInt(minute)});
	},[date, timeSlot]);

	useEffect(()=>{
		setTableAvailability(null);
		setErrMessage(null);
		setSelectedTable(-1);

		if(targetDateTime.isValid) {
			if(DateTime.now() > targetDateTime) {
				setErrMessage("Nie można zarezerwować stolika w przeszłości.");

				return;
			}

			setParamsReady(true);
			setFetchErr(false);
			
			const aborter = new AbortController();

			new Promise<void>(async res=>{
				const response = await fetch(`/api/tableAvailability/${restaurantID}/${targetDateTime.toISO()}`, {signal: aborter.signal});

				if (response.ok) {
					const data = await response.json() as GetTableAvailabilityEndpoint.IResponse<"Success">;

					setTableAvailability(data.data);
				}else {
					const data = await response.json() as GetTableMapEndpoint.IResponse<"Failure">;
					setFetchErr(true);
					throw new Error(`Couldn't fetch restaurant table availability ErrCode: ${data.errCode}`);
				}
				res();
			});

			return ()=>aborter.abort();
		}
	},[date,timeSlot]);

	useEffect(()=>{
		setSelectedTable(-1);
		setErrMessage(null);
	},[tableSize]);

	useEffect(()=>{
		setCanBook(selectedTable!=-1);
		setErrMessage(null);
	},[selectedTable]);

	const dateInputClickAction = useCallback((e: MouseEvent<HTMLInputElement>)=> {
		(e.target as HTMLInputElement).showPicker();
	},[]);


	const submitReservationAction = ()=>{
		setFetchErr(false);
		const aborter = new AbortController();

		if(!targetDateTime.isValid) return;

		const params = {
			datetime: targetDateTime.toISO(),
			tableID: selectedTable.toString(),
			numOfClients: tableSize.toString(),
		}

        new Promise<void>(async res=>{
			const response = await fetch(`/api/booking`, {signal: aborter.signal, method: "POST", body: new URLSearchParams(params)});

			if (response.ok) {
				setBookComplete(true);
				setErrMessage(null);
			}else {
				const data = await response.json() as CreateReservationEndpoint.IResponse<"Failure">;
				setErrMessage("Nie udało się przeprowadzić procesu rezerwacji.");
				throw new Error(`Couldn't create reservation. ErrCode: ${data.errCode}`);
			}
            res();
        });

        return ()=>aborter.abort();
	};


	return (
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
						paramsReady ?
							<TableMap tableMap={tableMap} availabilityData={tableAvailability ?? []} selectedTableID={selectedTable} setSelectedTableID={setSelectedTable} numOfPeople={tableSize}/>
						:
							<h4>Wybierz dzień oraz godzinę</h4>
					}
					{
						tableAvailability==null&&paramsReady?
							<div className={classes.LoadingCover}>
								{
									fetchErr?
										<h2>Coś poszło nie tak</h2>
									:
										<SyncLoader size="20px" color='var(--orange-color)' />
								}
							</div>
						:""
					}
				</div>
			</div>
			<button type="button" className={classes.SubmitButton} disabled={!canBook} onClick={submitReservationAction}>Rezerwuj</button>
		</div>
	);
}
