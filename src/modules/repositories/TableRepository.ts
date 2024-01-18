import Table from "../models/Table.js";
import RestaurantRepository from "./RestaurantRepository.js";

export default class TableRepository {

    public async getRestaurantTables(id: number) {
        const restaurantRepo = new RestaurantRepository();

        const tableRecords = await global.app.orm.table.findMany({
            where: {
                restaurant_id: id
            }
        })

        const tables = [];

        for (const record of tableRecords) {
            const restaurant = await restaurantRepo.getRestaurantByID(record.restaurant_id);

            if (!restaurant) {
                return null;
            }

            const table = new Table(record.table_id, restaurant, record.table_name, record.description, record.min_clients, record.max_clients);
            tables.push(table);
        }

        return tables;
    }
}