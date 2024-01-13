import React, { CSSProperties } from 'react';

import classes from "./Restaurants.css";
import SearchBar from '../../components/SearchBar/SearchBar';

import locationImg from "../../assets/ui/location-orange.svg";
import foodtypeImg from "../../assets/ui/foodtype-orange.svg";

export default function Restaurants() {

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
					mockRestaurants.map(rest=>
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
