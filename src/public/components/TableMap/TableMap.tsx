import React, { CSSProperties } from 'react'

import classes from "./TableMap.css";
import { TableMap } from '../../types/api';

interface ITableMapProps {
	tableMap: TableMap.ITableMapDefinition
	availabilityData: TableMap.ITableAvailability[]
	selectedTableID: number
	setSelectedTableID: (ID: number)=>void
	numOfPeople: number
}

interface ITableProps {
	table: TableMap.ITableData
	state: "Neutral" | "Disabled" | "Selected" | "Booked";
	clickHandler: ()=>void
}

interface IDecorProps {
	decor: TableMap.IDecorData
}

export default React.memo(function TableMap({tableMap, availabilityData, selectedTableID, setSelectedTableID, numOfPeople}: ITableMapProps) {

	return (
		<div className={classes.TableMap}>
			<div className={classes.Host} style={{height: tableMap.height, width: tableMap.width}}>
			{
				tableMap.tables.map(table=>{
					let state: "Selected" | "Disabled" | "Booked" | "Neutral";

					switch(true) {
						case selectedTableID==table.id: state = "Selected"; break;
						case availabilityData.filter(availData=>availData.id==table.id)[0]?.isBooked: state = "Booked"; break;
						case numOfPeople>table.maxPeople||numOfPeople<table.minPeople: state = "Disabled"; break;
						default: state="Neutral";
					}

					return <Table key={table.id} table={table} clickHandler={()=>setSelectedTableID(table.id)} state={state}/>
				})
			}
			{
				tableMap.decors.map((decor, i)=>
					<Decor key={i} decor={decor} />
				)
			}
			</div>
		</div>
	)
});

const Table = React.memo(function Table({table,state, clickHandler}: ITableProps) {

	if(table.type=="Rect") {
		return (
			<div className={`${classes.Table} ${state=="Selected"?classes.Selected:""} ${state==="Disabled"?classes.Disabled:""} ${state==="Booked"?classes.Reserved:""}`} 
				onClick={state=="Neutral"?clickHandler:undefined} 
				style={{
					left:`${table.x}px`, 
					top: `${table.y}px`, 
					width: `${table.width}px`, 
					height: `${table.height}px`, 
					"--rotate": table.rotation?`${table.rotation}deg`:""} as CSSProperties
				}>
					<span>{table.name}<br></br>{table.minPeople} - {table.maxPeople}</span>
			</div>
		)
	}else {
		return (
			<div className={`${classes.Table} ${classes.Round} ${state=="Selected"?classes.Selected:""} ${state==="Disabled"?classes.Disabled:""} ${state==="Booked"?classes.Reserved:""}`} 
				onClick={state=="Neutral"?clickHandler:undefined} 
				style={{
					left:`${table.x}px`, 
					top: `${table.y}px`, 
					width: `${table.radius}px`, 
					height: `${table.radius}px`
				}}>
					<span>{table.name}<br></br>{table.minPeople} - {table.maxPeople}</span>
			</div>
		)
	}
    
});

const Decor = React.memo(function Decor({decor}: IDecorProps) {
	return (
		<div className={classes.Decor} style={{left:`${decor.x}px`, top: `${decor.y}px`, width: `${decor.width}px`, height: `${decor.height}px`}}>
			<span>{decor.label}</span>
		</div>
	);
})
