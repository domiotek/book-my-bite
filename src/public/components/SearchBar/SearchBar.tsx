import React, { useEffect, useState } from "react";
import foodtypeImg from "../../assets/ui/foodtype.svg";
import locationImg from "../../assets/ui/location.svg";
import searchImg from "../../assets/ui/search.svg";

import classes from './SearchBar.css';

export default function SearchBar() {
    const [locations, setLocations] = useState<Location[]>([]);
    const [foodtypes, setFoodtypes] = useState<Foodtype[]>([]);

    useEffect(() => {
        const aborter = new AbortController();

        new Promise<void>(async res=>{
            try {
                const response = await fetch('/api/locationsAndFoodtypes', {signal: aborter.signal});

                if (!response.ok) {
                    console.log('Cannot reach response');
                }

                const data = await response.json();
                setLocations(data.locations);
                setFoodtypes(data.foodtypes);
            } catch (e) {
                console.log('Error in fetch operation: ', e);
            }

            res();
        });

        return ()=>aborter.abort();
    }, []);

    return (
        <div className={classes.searchBar}>
            <h2>Zarezerwuj stolik</h2>
            <div className={classes.searchFilter}>
                <div className={classes.element}>
                    <img src={locationImg} alt="location" />
                    <select name="location" id="location" title="Lokalizacja">
                        <option value="">Lokalizacja</option>
                        {
                            locations.map((location) => (
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
                    <select name="foodtype" id="foodtype" title="Kategoria">
                        <option value="">Kategoria</option>
                        {
                            foodtypes.map((foodtype) => (
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