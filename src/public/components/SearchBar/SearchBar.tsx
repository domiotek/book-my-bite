import React, { useContext, useEffect, useState } from "react";
import foodtypeImg from "../../assets/ui/foodtype.svg";
import locationImg from "../../assets/ui/location.svg";
import searchImg from "../../assets/ui/search.svg";

import classes from './SearchBar.css';
import { AppContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { GetRestaurantSearchParamsEndpoint } from "../../types/api";

export default function SearchBar() {
    const [locations, setLocations] = useState<GetRestaurantSearchParamsEndpoint.ILocation[]>([]);
    const [foodtypes, setFoodtypes] = useState<GetRestaurantSearchParamsEndpoint.IFoodtype[]>([]);

    const [location, setLocation] = useState<number>(0);
    const [foodType, setFoodType] = useState<number>(0);
    const [restaurantName, setRestaurantName] = useState<string>('');

    const [appContext, setAppContext] = useContext(AppContext);
    const navigate = useNavigate();

    const handleLocationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setLocation(+event.target.value);
    };

    const handleFoodTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFoodType(+event.target.value);
    };

    const handleRestaurantNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRestaurantName(event.target.value);
    };

    useEffect(() => {
        if (appContext.filters) {
            setLocation(appContext.filters.city || 0);
            setFoodType(appContext.filters.foodType || 0);
            setRestaurantName(appContext.filters.name || '');
        }
    }, [appContext.filters]);

    useEffect(() => {
        const aborter = new AbortController();

        new Promise<void>(async res=>{
            try {
                const response = await fetch('/api/searchParams', {signal: aborter.signal});

                if (!response.ok) {
                    const result = await response.json() as GetRestaurantSearchParamsEndpoint.IResponse<"Failure">;

                    console.error(`Couldn't get search parameters. ErrCode: ${result.errCode}`);
                    return;
                }

                const data = await response.json() as GetRestaurantSearchParamsEndpoint.IResponse<"Success">;
                setLocations(data.data.locations);
                setFoodtypes(data.data.foodtypes);
            } catch (e) {
                console.log('Error in fetch searchParams operation: ', e);
            }

            res();
        });

        return ()=>aborter.abort();
    }, []);

    function onSearch() {        
        const newFilters = { city: location, name: restaurantName, foodType: foodType};

        setAppContext({...appContext, filters: newFilters});

        if (window.location.pathname === '/' || window.location.pathname === '/Home') {
            navigate('/Restaurants');
        }
    }

    return (
        <div className={classes.searchBar}>
            <h2>Zarezerwuj stolik</h2>
            <div className={classes.searchFilter}>
                <div className={classes.element}>
                    <img src={locationImg} alt="location" />
                    <select name="location" id="location" title="Lokalizacja" value={location} onChange={handleLocationChange}>
                        <option value="0">Lokalizacja</option>
                        {
                            locations.map((location) => (
                                <option key={location.id} value={location.id}>{location.name}</option>
                            ))
                        }
                    </select>
                </div>
                <div className={classes.element}>
                    <img src={searchImg} alt="search" />
                    <input type="text" name="restaurant" placeholder="Restauracja" value={restaurantName} onChange={handleRestaurantNameChange} />
                </div>
                <div className={classes.element}>
                    <img src={foodtypeImg} alt="foodtype" />
                    <select name="foodtype" id="foodtype" title="Kategoria" value={foodType} onChange={handleFoodTypeChange}>
                        <option value="0">Kategoria</option>
                        {
                            foodtypes.map((foodtype) => (
                                <option key={foodtype.id} value={foodtype.id}>{foodtype.name}</option>
                            ))
                        }
                    </select>
                </div>
                <button type="submit" onClick={onSearch}>Szukaj</button>
            </div>
        </div>
    )
}