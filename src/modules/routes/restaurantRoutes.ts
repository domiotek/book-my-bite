import RestaurantController from "../controllers/RestaurantController.js";

const getSearchParams = {
    method: "GET",
    url: "/api/searchParams",
    handler: RestaurantController.getRestaurantSearchParameters
}

const getRestaurants = {
    method: "GET",
    url: "/api/restaurants",
    handler: RestaurantController.getRestaurants
}

const getRestaurant = {
    method: "GET",
    url: "/api/restaurant/:id",
    handler: RestaurantController.getRestaurant
}

const getRestaurantTableMap = {
    method: "GET",
    url: "/api/restaurant/:id/tableMap",
    handler: RestaurantController.getRestaurantTableMap
}

export default [getSearchParams, getRestaurants, getRestaurant, getRestaurantTableMap];