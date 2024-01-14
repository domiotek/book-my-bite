import React, { createContext, useContext } from 'react'

import classes from "./Modal.css";
import { AppContext } from '../../App';

interface IProps {
	children: JSX.Element
}

interface IModalContext {
	closeModal: ()=>void
}

export const ModalContext = createContext<IModalContext>({closeModal: ()=>{}});

export default function Modal({children}: IProps) {
	const [appContext] = useContext(AppContext)

	return (
        <div className={classes.FullScreenWrapper}>
			<div className={classes.ModalContainer}>
				<ModalContext.Provider value={{closeModal: ()=>appContext.setModalContent(null)}}>
					{children}
				</ModalContext.Provider>
			</div>
		</div>
    )
}
