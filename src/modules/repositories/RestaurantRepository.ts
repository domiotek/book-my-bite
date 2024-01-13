import Address from "../models/Address";
import Foodtype from "../models/Foodtype";
import Menu from "../models/Menu";
import Restaurant from "../models/Restaurant";

export default class RestaurantRepository {


    public async getRestaurantByID(ID: number) {

        // const restaurant = await global.app.orm.restaurant.findUnique({where: {restaurant_id: ID}, include: {foodtype: true, address: {include: {city: {include: {voivodeship: {include: {country: true}}}}}}}});
        
    }

    public async getRestaurantByName(name: string) {

    }

    public async getRestaurantsByFoodType(foodtype: Foodtype) {

    }

    public async createRestaurant(name: string, description: string, menu: Menu, foodtype: Foodtype, address: Address, tableMap: object) {
        
    }

    public async deleteRestaurant(restaurant: Restaurant) {
        
    }

    public async updateRestaurant(restaurant: Restaurant) {

    }
}