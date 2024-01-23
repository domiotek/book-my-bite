import React, { CSSProperties, useContext, useEffect, useState } from 'react';

import classes from "./Restaurants.css";
import SearchBar from '../../components/SearchBar/SearchBar';

import locationImg from "../../assets/ui/location-orange.svg";
import foodtypeImg from "../../assets/ui/foodtype-orange.svg";
import { AppContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import { GetRestaurantsEndpoint } from '../../types/api';
import NoData from '../../components/NoData/NoData';

export default function Restaurants() {
	const [appContext, setAppContext] = useContext(AppContext);
	const [restaurants, setRestaurants] = useState<GetRestaurantsEndpoint.IRestaurantData[]>([]);

	const navigate = useNavigate();

	useEffect(() => {
		const aborter = new AbortController();

		new Promise<void>(async res => {
			try {
				const response = await fetch(`/api/restaurants?city=${appContext.filters.city}&name=${appContext.filters.name}&foodType=${appContext.filters.foodType}`, { signal: aborter.signal });

				if (!response.ok) {
					const result = await response.json() as GetRestaurantsEndpoint.IResponse<"Failure">;

					console.error(`Couldn't get restaurants. ErrCode: ${result.errCode}`);
					return;
				}

				const data = await response.json() as GetRestaurantsEndpoint.IResponse<"Success">;
				setRestaurants(data.data);
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

			<div className={classes.RestaurantsWrapper} style={{ gridTemplateColumns: restaurants.length === 0 ? 'auto' : 'repeat(auto-fit, minmax(400px, 1fr))'}}>
				{
					restaurants.length === 0 ? (
						<NoData />
					) :
					restaurants.map(rest =>
						<div key={rest.id} className={classes.RestaurantPanel} onClick={() => onSearch(rest.id)}>
							<div className={classes.Image} style={{ "--image-url": `url(/ilustrations/${rest.imgUrl})` } as CSSProperties} />
							<h3>{rest.name}</h3>
							<ul>
								<li>
									<img src={locationImg} alt="location" />
									<span>{rest.location}</span>
								</li>
								<li>
									<img src={foodtypeImg} alt="foodtype" />
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
