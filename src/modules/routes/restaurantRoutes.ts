import RestaurantController from "../controllers/RestaurantController.js";

const getLocationsAndFoodtypes = {
    method: "GET",
    url: "/api/locationsAndFoodtypes",
    handler: RestaurantController.getLocationsAndFoodtypes
}

export default [getLocationsAndFoodtypes];