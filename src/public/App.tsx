import React, { Suspense, createContext, useEffect, useMemo, useState } from 'react';

import classes from "./App.css";
import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import FullscreenNav from './components/FullscreenNav/FullscreenNav';
import Modal from './components/Modal/Modal';
import { CheckSignInEndpoint } from './types/api';

interface IRestaurantFilterOptions {
    city: number | null
    name: string | null
    foodType: number | null
}

interface IAppContext {
    isUserLoggedIn: boolean
	isRestaurantManager: boolean
	filters: IRestaurantFilterOptions
	selectedRestaurantID: number | null
	setModalContent: (modal: JSX.Element | null)=>void
}

export const AppContext = createContext<[IAppContext, (ctx: IAppContext)=>void]>([{isUserLoggedIn: false, isRestaurantManager: false, filters: {city: null, name: null, foodType: null}, selectedRestaurantID: null, setModalContent: ()=>{}},()=>{}]);

export default function App() {
	const [modalContent, setModalContent] = useState<JSX.Element | null>(null);
	const [appContext, setAppContext] = useState<IAppContext>(
		{
			isUserLoggedIn: false, 
			isRestaurantManager: false, 
			filters: {city: null, name: null, foodType: null}, 
			selectedRestaurantID: null, 
			setModalContent
		});

	const [isNavOpen, setIsNavOpen] = useState<boolean>(false);

	const links = useMemo(()=>{
		const commonLinks = [{displayName: "Restauracje", to: "/Home"}];
		const unauthorizedLinks = [{displayName: "Logowanie", to: "/Login"}, {displayName: "Rejestracja", to: "/Register"}];
		const authorizedLinks = [{displayName: "Rezerwacje", to: "/Reservations"}, {displayName: "Wyloguj", to: "/Logout"}];

		if(appContext.isUserLoggedIn) {
			if(appContext.isRestaurantManager) {
				return commonLinks.concat([{displayName: "Zarządzaj restauracją", to: "/ManageRestaurant"}], authorizedLinks);
			}else return commonLinks.concat(authorizedLinks);
		}else return commonLinks.concat(unauthorizedLinks);

	},[appContext.isUserLoggedIn, appContext.isRestaurantManager]);

	const updateAppContext = (newCtx: IAppContext)=>{
		if(appContext.selectedRestaurantID!=newCtx.selectedRestaurantID) {
			if(newCtx.selectedRestaurantID!=null) {
				sessionStorage.setItem("selectedRestaurantID",newCtx.selectedRestaurantID.toString());
			}else sessionStorage.removeItem("selectedRestaurantID");
			
		}

		setAppContext(newCtx);
	}

	useEffect(()=>{
		const selectedRestaurantID = sessionStorage.getItem("selectedRestaurantID");

		if(selectedRestaurantID!==null) {
			try {
				const newCtx = Object.assign({},appContext);
				newCtx.selectedRestaurantID = parseInt(selectedRestaurantID);
				setAppContext(newCtx);
			} catch (error: any) {
				console.error(`Couldn't restore restaurant selection. ${error.message}`);
			}
		}
	},[]);

	useEffect(()=>{
		const aborter = new AbortController();

		new Promise<void>(async res => {
			const response = await fetch(`/api/checkSignInStatus`, { signal: aborter.signal });

			if(response.ok) {
				const body = await response.json() as CheckSignInEndpoint.IResponse;
				const newCtx = Object.assign({},appContext);
                newCtx.isUserLoggedIn = body.data;
                setAppContext(newCtx);
			}
			res();
		});

		return () => aborter.abort();
	},[]);
	
    return (
      <div className={classes.AppWrapper}>
			<AppContext.Provider value={[appContext, updateAppContext]}>
				<Header links={links} navStateToggler={()=>setIsNavOpen(!isNavOpen)}/>
				<FullscreenNav links={links} openState={isNavOpen} hideNav={()=>setIsNavOpen(false)}/>
				<main>
					<Suspense fallback={<div></div>}>
						<Outlet />
					</Suspense>
				</main>
				<footer>
					&copy;2024 Wszelkie prawa zastrzeżone.
				</footer>
				{modalContent?<Modal>{modalContent}</Modal>:""}
			</AppContext.Provider>
      </div>
    );
}
