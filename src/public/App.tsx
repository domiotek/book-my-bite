import React, { Suspense, createContext, useMemo, useState } from 'react';

import classes from "./App.css";
import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import FullscreenNav from './components/FullscreenNav/FullscreenNav';
import Modal from './components/Modal/Modal';

interface IRestaurantFilterOptions {
    city: string | null
    name: string | null
    foodType: string | null
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
	
    return (
      <div className={classes.AppWrapper}>
			<AppContext.Provider value={[appContext, setAppContext]}>
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
