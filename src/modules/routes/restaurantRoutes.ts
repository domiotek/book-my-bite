import RestaurantController from "../controllers/RestaurantController.js";

const getLocationsAndFoodtypes = {
    method: "GET",
    url: "/api/locationsAndFoodtypes",
    handler: RestaurantController.getLocationsAndFoodtypes
}

const getRestaurants = {
    method: "GET",
    url: "/api/restaurants",
    handler: RestaurantController.getRestaurants
}

const getRestaurant = {
    method: "GET",
    url: "/api/restaurant",
    handler: RestaurantController.getRestaurant
}

export default [getLocationsAndFoodtypes, getRestaurants, getRestaurant];