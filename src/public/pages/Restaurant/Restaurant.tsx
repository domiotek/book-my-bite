import React, { CSSProperties } from 'react'

import classes from "./Restaurant.css";

import locationImg from "../../assets/ui/location-orange.svg";
import foodTypeImg from "../../assets/ui/foodtype-orange.svg";

export default function Restaurant() {
	return (
		<div className={classes.RestaurantPage}>
			<div className={classes.RestaurantContainer}>
				<div className={classes.RestaurantDetails}>
					<h4>Tomasza 20 Restro Bar</h4>
					<div className={classes.DetailItemsContainer}>
						<div className={classes.DetailsItem}>
							<img src={locationImg} alt="Location" />
							<div>
								<h5>Adres</h5>
								<h6>Kraków, Świętego Tomasza 20</h6>
							</div>
						</div>
						<div className={classes.DetailsItem}>
							<img src={foodTypeImg} alt="Food type" />
							<div>
								<h5>Kuchnia</h5>
								<h6>Kuchnia Włoska</h6>
							</div>
						</div>
						<div className={classes.DetailsItem}>
							<img src={locationImg} alt="Location" />
							<div>
								<h5>Opis</h5>
								<h6>Tu będzie jakiś opis, chyba</h6>
							</div>
						</div>
						<div className={classes.DetailsItem}>
							<img src={locationImg} alt="Location" />
							<div>
								<h5>Menu</h5>
								<button className={classes.ShowMenuButton}>Pokaż menu</button>
							</div>
						</div>
					</div>
				</div>
				<div className={classes.RestaurantImage} style={{"--image-url": "url(/ilustrations/restro_bar.jpg)"} as CSSProperties} />
			</div>
			<button className={classes.ReserveButton}>Rezerwuj</button>
		</div>
	)
}
