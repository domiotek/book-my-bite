import React from "react";
import foodtypeImg from "../../assets/ui/foodtype.svg";
import locationImg from "../../assets/ui/location.svg";
import searchImg from "../../assets/ui/search.svg";

import classes from './SearchBar.css';

export default function SearchBar() {

    const mockLocations = [
        { id: 1, name: 'Kraków' },
        { id: 2, name: 'Gdańsk' },
        { id: 3, name: 'Wrocław' },
    ];

    const mockFoodTypes = [
        { id: 1, name: 'Kuchnia Polska' },
        { id: 2, name: 'Kuchnia Włoska' },
        { id: 3, name: 'Kuchnia Meksykańska' },
        { id: 4, name: 'Kuchnia Amerykańska' },
        { id: 5, name: 'Kuchnia Japońska' },
    ]

    return (
        <div className={classes.searchBar}>
            <h2>Zarezerwuj stolik w restauracji</h2>
            <div className={classes.searchFilter}>
                <div className={classes.element}>
                    <img src={locationImg} alt="location" />
                    <select name="location" id="location">
                        <option value="">Lokalizacja</option>
                        {
                            mockLocations.map((location) => (
                                <option key={location.id} value={location.id}>{location.name}</option>
                            ))
                        }
                    </select>
                </div>
                <div className={classes.element}>
                    <img src={searchImg} alt="search" />
                    <input type="text" name="restaurant" placeholder="Restauracja" />
                </div>
                <div className={classes.element}>
                    <img src={foodtypeImg} alt="foodtype" />
                    <select name="location" id="location">
                        <option value="">Kategoria</option>
                        {
                            mockFoodTypes.map((foodtype) => (
                                <option key={foodtype.id} value={foodtype.id}>{foodtype.name}</option>
                            ))
                        }
                    </select>
                </div>
                <button type="button">Szukaj</button>
            </div>
        </div>
    )
}