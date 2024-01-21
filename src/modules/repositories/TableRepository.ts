import Restaurant from "../models/Restaurant.js";
import Table from "../models/Table.js";
import RestaurantRepository from "./RestaurantRepository.js";

export default class TableRepository {

    public async getRestaurantTables(id: number) {
        const restaurantRepo = new RestaurantRepository();

        const restaurant = await restaurantRepo.getRestaurantByID(id);

        if (!restaurant) {
            return null;
        }

        const tableRecords = await global.app.orm.table.findMany({
            where: {
                restaurant_id: id
            }
        })

        const tables = [];

        for (const record of tableRecords) {

            tables.push(new Table(record.table_id, restaurant, record.table_name, record.description, record.min_clients, record.max_clients));
        }

        return tables;
    }

    public async getTableByID(id: number) {
        const restaurantRepo = new RestaurantRepository();

        const tableRecord = await global.app.orm.table.findUnique({
            where: {
                table_id: id
            }
        });

        if(!tableRecord) return null;

        const restaurant = await restaurantRepo.getRestaurantByID(tableRecord.restaurant_id) as Restaurant;

        return new Table(tableRecord.table_id, restaurant, tableRecord.table_name, tableRecord.description, tableRecord.min_clients, tableRecord.max_clients);
    }
}