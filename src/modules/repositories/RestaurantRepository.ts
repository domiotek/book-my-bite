import Address from "../models/Address";
import City from "../models/City";
import Foodtype from "../models/Foodtype";
import Menu from "../models/Menu";
import Restaurant from "../models/Restaurant";

interface IRestaurantFilterOptions {
    city?: City
    name?: string
    foodType?: Foodtype
}

export default class RestaurantRepository {


    public async getRestaurantByID(ID: number) {

        // const restaurant = await global.app.orm.restaurant.findUnique({where: {restaurant_id: ID}, include: {foodtype: true, address: {include: {city: {include: {voivodeship: {include: {country: true}}}}}}}});
        
    }

    public async getRestaurants(filters: IRestaurantFilterOptions) {

    }

    public getRestaurantsByFoodType(foodType: Foodtype) {
        return this.getRestaurants({foodType});
    }

    public async createRestaurant(name: string, description: string, menu: Menu, foodtype: Foodtype, address: Address, tableMap: object) {
        
    }

    public async deleteRestaurant(restaurant: Restaurant) {
        
    }

    public async updateRestaurant(restaurant: Restaurant) {

    }
}