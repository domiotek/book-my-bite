import TableController from "../controllers/TableController.js";

const getTablesAvailability = {
    method: "GET",
    url: "/api/tableAvailability",
    handler: TableController.getTablesAvailability
}

export default [getTablesAvailability];