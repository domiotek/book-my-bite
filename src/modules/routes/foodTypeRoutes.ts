import FoodTypeController from "../controllers/FoodTypeController.js";

const getFoodTypesForHomePage = {
    method: "GET",
    url: "/api/foodTypes",
    handler: FoodTypeController.getFoodTypeIDs
}

export default [getFoodTypesForHomePage];