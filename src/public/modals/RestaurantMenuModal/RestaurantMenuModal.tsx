import React, { useCallback, useContext, useState } from 'react'
import { ModalContext } from '../../components/Modal/Modal'

import classes from "./RestaurantMenuModal.css";

interface IProps {
	images: Array<string>
}

export default function RestaurantMenuModal({images}: IProps) {

	const [currIndex, setCurrIndex] = useState<number>(0);
	const {closeModal} = useContext(ModalContext);


	const prevImgAction = ()=>{
		setCurrIndex(currIndex - 1);
	}

	const nextImgAction = ()=>{
		setCurrIndex(currIndex + 1);
	}

	return (
		<div className={classes.Wrapper}>
			<div className={classes.Header}>
				Menu
				<button type="button" onClick={closeModal}>X</button>
			</div>
			<img src={images[currIndex]} alt="Menu"/>
			{
				images.length>1?
				<>
					<button type="button" className={`${currIndex >0?classes.Shown:""} ${classes.PrevImgButton}`} onClick={prevImgAction}>{"<"}</button>
					<button type="button" className={`${currIndex < images.length - 1?classes.Shown:""} ${classes.NextImgButton}`} onClick={nextImgAction}>{">"}</button>
				</>
				:""
			}
			
		</div>
	)
}
