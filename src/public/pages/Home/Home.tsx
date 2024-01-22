import React, { useContext, useEffect, useState } from 'react';

import classes from "./Home.css";
import SearchBar from '../../components/SearchBar/SearchBar';
import { AppContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import { GetHomePageFoodTypesEndpoint } from '../../types/api';

interface IFoodTypes {
	[name: string]: number|undefined
}

export default function Home() {
	const [foodTypes, setFoodTypes] = useState<IFoodTypes>({});

	const [appContext, setAppContext] = useContext(AppContext);

	const navigate = useNavigate();

	useEffect(()=>{
		const aborter = new AbortController();

		new Promise<void>(async res => {
			const response = await fetch(`/api/foodTypes`, { signal: aborter.signal });

			if(response.ok) {
				const body = await response.json() as GetHomePageFoodTypesEndpoint.IResponse<"Success">;

				const result: IFoodTypes = {};
				
				body.data.forEach(val=>{
					result[val.name] = val.id;
				});

				setFoodTypes(result);
			}
			res();
		});

		return () => aborter.abort();
	},[]);

	function panelClickAction(this: number|undefined) {
		if(this) {
			setAppContext({...appContext, filters: {foodType: this, name: null, city: null}});
			navigate("/Restaurants");
		}
	}

	return (
		<div className={classes.HomePage}>
			<SearchBar />
			<div className={classes.CuisineWrapper}>
				<div className={classes.CuisinePanel} onClick={panelClickAction.bind(foodTypes["Polska"])}>
					<h2>Kuchnia Polska</h2>
					<img src="/ilustrations/polish-cuisine.png" alt="Polish cuisine" />
				</div>
				<div className={classes.CuisinePanel} onClick={panelClickAction.bind(foodTypes["Włoska"])}>
					<h2>Kuchnia Włoska</h2>
					<img src="/ilustrations/italian-cuisine.png" alt="Italian cuisine" />
				</div>
				<div className={classes.CuisinePanel} onClick={panelClickAction.bind(foodTypes["Meksykańska"])}>
					<h2>Kuchnia Meksykańska</h2>
					<img src="/ilustrations/mexican-cuisine.png" alt="Mexican cuisine" />
				</div>
				<div className={classes.CuisinePanel} onClick={panelClickAction.bind(foodTypes["Amerykańska"])}>
					<h2>Kuchnia Amerykańska</h2>
					<img src="/ilustrations/american-cuisine.png" alt="American cuisine" />
				</div>
			</div>

		</div>
	)
}
