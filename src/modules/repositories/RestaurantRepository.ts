import Restaurant from "../models/Restaurant.js";
import Address from "../models/Address.js";
import Foodtype from "../models/Foodtype.js";
import Menu from "../models/Menu.js";
import City from "../models/City.js";

interface IRestaurantFilterOptions {
    city?: City;
    name?: string;
    foodType?: Foodtype;
}

export default class RestaurantRepository {

    // Get a single restaurant by ID
    public async getRestaurantByID(ID: number) {
        const result = await global.app.orm.restaurant.findUnique({
            where: {
                restaurant_id: ID,
            },
            include: {
                foodtype: true,
                address: true,
            },
        });
        if (!result) {
            return null;
        }
        return result;
    }

    // Create a new restaurant
    public async createRestaurant(restaurant: Restaurant) {
        return await global.app.orm.restaurant.create({
            data:{
                name: restaurant.getName(),
                description: restaurant.getDescription(),
                menu_id: restaurant.getMenu().getID(),
                foodtype_id: restaurant.getFoodtype().getID(),
                address_id: restaurant.getAddress().getID(),
                table_map: restaurant.getTablemap(),
            }
        });
    }
}
