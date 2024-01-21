import TableController from "../controllers/TableController.js";

const getTablesAvailability = {
    method: "GET",
    url: "/api/tableAvailability/:restaurantID/:dateTime",
    handler: TableController.getTablesAvailability
}

export default [getTablesAvailability];