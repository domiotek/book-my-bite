import React, { CSSProperties } from 'react'

import classes from "./TableMap.css";

interface IRectTableData {
	type: "Rect"
	id: number,
	name: string
	x: number
	y: number
	width: number
	height: number
	rotation?: number
	minPeople: number
	maxPeople: number
}

interface IRoundTableData {
	type: "Round"
	id: number
	name: string
	x: number
	y: number
	radius: number
	minPeople: number
	maxPeople: number
}

interface IDecorData {
	x: number
	y: number
	width: number
	height: number
	label?: string
}

type ITableData = IRoundTableData | IRectTableData;

export interface ITableMapDefinition {
	width: number, 
	height: number, 
	tables: ITableData[], 
	decors: IDecorData[]
}

interface ITableMapProps {
	tableMap: ITableMapDefinition
	selectedTableID: number
	setSelectedTableID: (ID: number)=>void
	numOfPeople: number
}

export default React.memo(function TableMap({tableMap, selectedTableID, setSelectedTableID, numOfPeople}: ITableMapProps) {

	return (
		<div className={classes.TableMap}>
			<div className={classes.Host} style={{height: tableMap.height, width: tableMap.width}}>
			{
				tableMap.tables.map(table=>{
					const state = selectedTableID==table.id?"Selected":(numOfPeople>table.maxPeople||numOfPeople<table.minPeople?"Disabled":"Neutral");

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

interface ITableProps {
	table: ITableData
	state: "Neutral" | "Disabled" | "Selected"
	clickHandler: ()=>void
}

const Table = React.memo(function Table({table,state, clickHandler}: ITableProps) {

	if(table.type=="Rect") {
		return (
			<div className={`${classes.Table} ${state=="Selected"?classes.Selected:""} ${state==="Disabled"?classes.Disabled:""}`} 
				onClick={state!="Disabled"?clickHandler:undefined} 
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
			<div className={`${classes.Table} ${classes.Round} ${state=="Selected"?classes.Selected:""} ${state==="Disabled"?classes.Disabled:""}`} 
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

interface IDecorProps {
	decor: IDecorData
}

const Decor = React.memo(function Decor({decor}: IDecorProps) {
	return (
		<div className={classes.Decor} style={{left:`${decor.x}px`, top: `${decor.y}px`, width: `${decor.width}px`, height: `${decor.height}px`}}>
			<span>{decor.label}</span>
		</div>
	);
})
