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

export default [getLocationsAndFoodtypes, getRestaurants];