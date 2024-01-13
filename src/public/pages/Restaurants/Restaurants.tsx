import React, { CSSProperties } from 'react';
import {DateTime} from "luxon";

import classes from "./Restaurants.css";
import SearchBar from '../../components/SearchBar/SearchBar';

export default function Restaurants() {

  return (
	<div className={classes.RestaurantsPage}>
		<SearchBar />

		

		<div className={classes.RestaurantsWrapper}>
			<div className={classes.RestaurantPanel}>
				<div className={classes.Image} style={{"--image-url": "url(/ilustrations/restro_bar.jpg)"} as CSSProperties}/>
				<h3>Tomasza 20 Restro Bar</h3>
				<ul>
					<li>
						<img src="ff" alt="" />
						<span>Kraków, Świętego Tomasza 20</span>
					</li>
					<li>
						<img src="" alt="" />
						<span>Kuchnia Włoska</span>
					</li>
				</ul>
			</div>
			<div className={classes.RestaurantPanel}>
				<div className={classes.Image} style={{"--image-url": "url(/ilustrations/olio.jpg)"} as CSSProperties}/>
				<h3>Olio | Pizza Napoletana</h3>
				<ul>
					<li>
						<img src="ff" alt="" />
						<span>Kraków, Nadwiślańska 7</span>
					</li>
					<li>
						<img src="" alt="" />
						<span>Kuchnia Włoska</span>
					</li>
				</ul>
			</div>

			<div className={classes.RestaurantPanel}>
				<div className={classes.Image} style={{"--image-url": "url(/ilustrations/restro_bar.jpg)"} as CSSProperties}/>
				<h3>Tomasza 20 Restro Bar</h3>
				<ul>
					<li>
						<img src="ff" alt="" />
						<span>Kraków, Świętego Tomasza 20</span>
					</li>
					<li>
						<img src="" alt="" />
						<span>Kuchnia Włoska</span>
					</li>
				</ul>
			</div>
			<div className={classes.RestaurantPanel}>
				<div className={classes.Image} style={{"--image-url": "url(/ilustrations/olio.jpg)"} as CSSProperties}/>
				<h3>Olio | Pizza Napoletana</h3>
				<ul>
					<li>
						<img src="ff" alt="" />
						<span>Kraków, Nadwiślańska 7</span>
					</li>
					<li>
						<img src="" alt="" />
						<span>Kuchnia Włoska</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
  )
}
