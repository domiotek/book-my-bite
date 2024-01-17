import React, { CSSProperties, useCallback, useContext, useEffect, useState } from 'react'

import classes from "./Restaurant.css";

import locationImg from "../../assets/ui/location-orange.svg";
import foodTypeImg from "../../assets/ui/foodtype-orange.svg";
import descriptionImg from "../../assets/ui/description.svg";
import menuImg from "../../assets/ui/menu.svg";
import { AppContext } from '../../App';
import RestaurantMenuModal from '../../modals/RestaurantMenuModal/RestaurantMenuModal';
import MakeReservationModal from '../../modals/MakeReservationModal/MakeReservationModal';
import { Restaurant } from '../../types/api';
import { useNavigate } from 'react-router-dom';

export default function Restaurant() {
	const [appContext, setAppContext] = useContext(AppContext);
	const [restaurant, setRestaurant] = useState<Restaurant>();

	const showFoodMenuAction = useCallback(() => {
		appContext.setModalContent(<RestaurantMenuModal images={["/ilustrations/mock_menu.jpg", "/ilustrations/restro_bar.jpg"]} />);
	}, []);

	const showReservationModalAction = useCallback(() => {
		appContext.setModalContent(<MakeReservationModal />);
	}, []);

	const navigate = useNavigate();

	useEffect(() => {

		if(appContext.selectedRestaurantID==null) {
			navigate("/Restaurants");
		}

		const aborter = new AbortController();

		new Promise<void>(async res => {
			try {
				const response = await fetch(`/api/restaurant?id=${appContext.selectedRestaurantID}`, { signal: aborter.signal });

				if (!response.ok) {
					console.log('Cannot reach restaurant response');
				}

				const data = await response.json();
				setRestaurant(data.restaurant);
			} catch (e) {
				console.log('Error in fetch restaurant operation: ', e);
			}

			res();
		});

		return () => aborter.abort();
	}, []);

	return (
		<div className={classes.RestaurantPage}>
			<div className={classes.RestaurantContainer}>
				<div className={classes.RestaurantDetails}>
					<h4>{restaurant?.name}</h4>
					<div className={classes.DetailItemsContainer}>
						<div className={classes.DetailsItem}>
							<img src={locationImg} alt="Location" />
							<div>
								<h5>Adres</h5>
								<h6>{restaurant?.location}</h6>
							</div>
						</div>
						<div className={classes.DetailsItem}>
							<img src={foodTypeImg} alt="Food type" />
							<div>
								<h5>Kuchnia</h5>
								<h6>{restaurant?.foodtype}</h6>
							</div>
						</div>
						<div className={classes.DetailsItem}>
							<img src={descriptionImg} alt="Description" />
							<div>
								<h5>Opis</h5>
								<h6>{restaurant?.description}</h6>
							</div>
						</div>
						<div className={classes.DetailsItem}>
							<img src={menuImg} alt="Menu" />
							<div>
								<h5>Menu</h5>
								<button className={classes.ShowMenuButton} onClick={showFoodMenuAction}>Pokaż menu</button>
							</div>
						</div>
					</div>
				</div>
				<div className={classes.RestaurantImage} style={{ "--image-url": `url(/ilustrations/${restaurant?.imgUrl})` } as CSSProperties} />
			</div>
			<button className={classes.ReserveButton} onClick={showReservationModalAction}>Rezerwuj</button>
		</div>
	)
}
