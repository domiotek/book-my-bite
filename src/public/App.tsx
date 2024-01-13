import React, { Suspense, createContext, useMemo, useState } from 'react';

import classes from "./App.css";
import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import FullscreenNav from './components/FullscreenNav/FullscreenNav';

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
}

export const AppContext = createContext<[IAppContext, (ctx: IAppContext)=>void]>([{isUserLoggedIn: false, isRestaurantManager: false, filters: {city: null, name: null, foodType: null}, selectedRestaurantID: null},()=>{}]);

export default function App() {
	const [appContext, setAppContext] = useState<IAppContext>({isUserLoggedIn: false, isRestaurantManager: false, filters: {city: null, name: null, foodType: null}, selectedRestaurantID: null});
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
			<Header links={links} navStateToggler={()=>setIsNavOpen(!isNavOpen)}/>
			<FullscreenNav links={links} openState={isNavOpen} hideNav={()=>setIsNavOpen(false)}/>
			<main>
				<AppContext.Provider value={[appContext, setAppContext]}>
					<Suspense fallback={<div></div>}>
						<Outlet />
					</Suspense>
				</AppContext.Provider>
			</main>
			<footer>
					&copy;2024 Wszelkie prawa zastrzeżone.
			</footer>
      </div>
    );
}
