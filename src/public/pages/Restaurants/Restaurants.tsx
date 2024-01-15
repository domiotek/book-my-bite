import React, { CSSProperties, useContext, useEffect, useState } from 'react';

import classes from "./Restaurants.css";
import SearchBar from '../../components/SearchBar/SearchBar';

import locationImg from "../../assets/ui/location-orange.svg";
import foodtypeImg from "../../assets/ui/foodtype-orange.svg";
import { AppContext } from '../../App';

export default function Restaurants() {
	const [appContext] = useContext(AppContext);
	const [restaurants, setRestaurants] = useState<Restaurants[]>([]);

	useEffect(() => {
		const aborter = new AbortController();

		new Promise<void>(async res => {
			try {			
				const response = await fetch(`/api/restaurants?city=${appContext.filters.city}&name=${appContext.filters.name}&foodType=${appContext.filters.foodType}`, {signal: aborter.signal});

				if (!response.ok) {
					console.log('Cannot reach restaurants response')
				}

				const data = await response.json();
				setRestaurants(data.restaurants);
			} catch (e) {
				console.log('Error in fetch restaurants operation: ', e)
			}

			res();
		});

		return () => aborter.abort();
	}, [appContext.filters]);

	const mockRestaurants = [
		{
			id: 1,
			name: "Tomasza 20 Resto Bar",
			location: "Kraków, Świętego Tomasza 20",
			foodtype: "Kuchnia Włoska",
			imgUrl: "restro_bar.jpg"
		},
		{
			id: 2,
			name: "Olio | Pizza Napoletana",
			location: "Kraków, Nadwiślańska 7",
			foodtype: "Kuchnia Włoska",
			imgUrl: "olio.jpg"
		},
		{
			id: 3,
			name: "Tomasza 20 Resto Bar",
			location: "Kraków, Świętego Tomasza 20",
			foodtype: "Kuchnia Włoska",
			imgUrl: "restro_bar.jpg"
		},
		{
			id: 4,
			name: "Olio | Pizza Napoletana",
			location: "Kraków, Nadwiślańska 7",
			foodtype: "Kuchnia Włoska",
			imgUrl: "olio.jpg"
		},
	]

	return (
		<div className={classes.RestaurantsPage}>
			<SearchBar />

			<div className={classes.RestaurantsWrapper}>
				{
					restaurants.map(rest=>
						<div key={rest.id} className={classes.RestaurantPanel}>
							<div className={classes.Image} style={{"--image-url": `url(/ilustrations/${rest.imgUrl})`} as CSSProperties}/>
							<h3>{rest.name}</h3>
							<ul>
								<li>
									<img src={locationImg} alt="" />
									<span>{rest.location}</span>
								</li>
								<li>
									<img src={foodtypeImg} alt="" />
									<span>{rest.foodtype}</span>
								</li>
							</ul>
						</div>
					)
				}
			</div>
		</div>
	)
}
