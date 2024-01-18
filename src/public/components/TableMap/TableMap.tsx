import React, { CSSProperties } from 'react'

import classes from "./TableMap.css";

interface IRectTableData {
	type: "Rect"
	id: number,
	name: string
	x: number
	y: number
	width: number
	length: number
	rotation?: number
}

interface IRoundTableData {
	type: "Round"
	id: number
	name: string
	x: number
	y: number
	radius: number
}

interface IDecorData {
	x: number
	y: number
	width: number
	height: number
	label?: string
}

type ITableData = IRoundTableData | IRectTableData;

export default React.memo(function TableMap() {

    const mockTableData: {width: number, height: number, tables: ITableData[], decors: IDecorData[]} = {
        width: 800,
        height: 600,
        tables: [
            { id: 0, type: "Rect", name: "A1", x: 10, y: 100, width: 140, length: 80 },
			{ id: 0, type: "Rect", name: "A2", x: 10, y: 255, width: 140, length: 80},
			{ id: 0, type: "Rect", name: "A3", x: 10, y: 410, width: 140, length: 80 },
			{ id: 0, type: "Rect", name: "B1", x: 360, y: 100, width: 80, length: 80 },
			{ id: 0, type: "Rect", name: "B2", x: 275, y: 255, width: 80, length: 80 },
			{ id: 0, type: "Rect", name: "B3", x: 445, y: 255, width: 80, length: 80 },
			{ id: 0, type: "Rect", name: "B4", x: 360, y: 410, width: 80, length: 80 },
			{ id: 0, type: "Rect", name: "B5", x: 360, y: 565, width: 80, length: 80},
			{ id: 0, type: "Rect", name: "C1", x: 650, y: 100, width: 140, length: 80 },
			{ id: 0, type: "Rect", name: "C2", x: 650, y: 255, width: 140, length: 80 },
			{ id: 0, type: "Rect", name: "C3", x: 650, y: 410 , width: 140, length: 80},
        ],
		decors: [
			{x: 360, y: 185, width: 80, height: 220},
			{x: 160, y: 10, width: 115, height: 30, label: "Drzwi"},
			{x: 530, y: 10, width: 115, height: 30, label: "Drzwi"},
			{x: 30, y: 615, width: 110, height: 30, label: "WC"},
			{x: 555, y: 615, width: 110, height: 30, label: "TV"}
		]
    }

	return (
		<div className={classes.TableMap}>
			<div className={classes.Host} style={{height: mockTableData.height, width: mockTableData.width}}>
			{
				mockTableData.tables.map(table=>
					<Table key={table.id} table={table}/>
				)
			}
			{
				mockTableData.decors.map((decor, i)=>
					<Decor key={i} decor={decor} />
				)
			}
			</div>
		</div>
	)
});

interface ITableProps {
	table: ITableData
}

const Table = React.memo(function Table({table}: ITableProps) {

	if(table.type=="Rect") {
		return (
			<div className={classes.Table} style={{left:`${table.x}px`, top: `${table.y}px`, width: `${table.width}px`, height: `${table.length}px`, "--rotate": table.rotation?`${table.rotation}deg`:""} as CSSProperties}>
				<span>{table.name}</span>
			</div>
		)
	}else {
		return (
			<div className={`${classes.Table} ${classes.Round}`} style={{left:`${table.x}px`, top: `${table.y}px`, width: `${table.radius}px`, height: `${table.radius}px`}}>
				<span>{table.name}</span>
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
