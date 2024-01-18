import React, { CSSProperties, useContext, useEffect, useState } from 'react';

import classes from "./Restaurants.css";
import SearchBar from '../../components/SearchBar/SearchBar';

import locationImg from "../../assets/ui/location-orange.svg";
import foodtypeImg from "../../assets/ui/foodtype-orange.svg";
import { AppContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import { Restaurants } from '../../types/api';

export default function Restaurants() {
	const [appContext, setAppContext] = useContext(AppContext);
	const [restaurants, setRestaurants] = useState<Restaurants[]>([]);

	const navigate = useNavigate();

	useEffect(() => {
		const aborter = new AbortController();

		new Promise<void>(async res => {
			try {
				const response = await fetch(`/api/restaurants?city=${appContext.filters.city}&name=${appContext.filters.name}&foodType=${appContext.filters.foodType}`, { signal: aborter.signal });

				if (!response.ok) {
					console.log('Cannot reach restaurants response');
					return;
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

	function onSearch(id: number) {
		const newSelectedRestaurant = id;

		setAppContext({ ...appContext, selectedRestaurantID: newSelectedRestaurant });

		navigate('/Restaurant');
	}

	return (
		<div className={classes.RestaurantsPage}>
			<SearchBar />

			<div className={classes.RestaurantsWrapper}>
				{
					restaurants.map(rest =>
						<div key={rest.id} className={classes.RestaurantPanel} onClick={() => onSearch(rest.id)}>
							<div className={classes.Image} style={{ "--image-url": `url(/ilustrations/${rest.imgUrl})` } as CSSProperties} />
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
