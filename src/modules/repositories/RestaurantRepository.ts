import City from "../models/City.js";
import Foodtype from "../models/Foodtype.js";
import Restaurant from "../models/Restaurant.js";
import Menu from "../models/Menu.js";
import Address from "../models/Address.js";
import Voivodeship from "../models/Voivodeship.js";
import Country from "../models/Country.js";

interface IRestaurantFilterOptions {
    city?: City
    name?: string
    foodType?: Foodtype
}

export default class RestaurantRepository {

    public async getRestaurantByID(ID: number) {
        const result = await global.app.orm.restaurant.findUnique({
            include: {
                menu: true,
                foodtype: true,
                address: {
                    include: {
                        city: {
                            include: {
                                voivodeship: {
                                    include: {
                                        country: true
                                    }
                                }
                            }
                        }
                    }
                }
            },
            where: {
                restaurant_id: ID,
            }
        });

        if (!result) {
            return null;
        }

        const menu = new Menu(result.menu.menu_id, result.menu.url);

        const foodType = new Foodtype(result.foodtype.foodtype_id, result.foodtype.name);

        const country = new Country(result.address.city.voivodeship.country.country_id, result.address.city.voivodeship.country.name);

        const voivodeship = new Voivodeship(result.address.city.voivodeship.voivodeship_id, result.address.city.voivodeship.name, country);

        const city = new City(result.address.city.city_id, result.address.city.name, voivodeship);

        const address = new Address(result.address.address_id, city, result.address.street_name, +result.address.building_number, result.address.zip_code);

        return new Restaurant(result.restaurant_id, result.name, result.description, menu, foodType, address, result.image, result.table_map as any);
    }

    public async getRestaurants(filters: IRestaurantFilterOptions) {
        const result = await global.app.orm.restaurant.findMany({
            include: {
                address: true
            },
            where: {
                address: {
                    city_id: filters.city?.getID()
                },
                name: filters.name,
                foodtype_id: filters.foodType?.getID()
            },
        });

        const restaurants = [];

        for (const r of result) {
            const restaurant = await this.getRestaurantByID(r.restaurant_id);
            restaurants.push(restaurant);
        }

        return restaurants;
    }

    public async createRestaurant(restaurant: Restaurant) {
        try {
            await global.app.orm.restaurant.createMany({
                data: [
                    {
                        name: restaurant.getName(),
                        description: restaurant.getDescription(),
                        menu_id: restaurant.getMenu().getID(),
                        foodtype_id: restaurant.getFoodtype().getID(),
                        address_id: restaurant.getAddress().getID(),
                        image: restaurant.getImage(),
                        table_map: restaurant.getTablemap()
                    }
                ]
            });
        } catch (e) {
            return false;
        }

        return true;
    }

    public async deleteRestaurant(restaurant: Restaurant) {
        const result = await global.app.orm.restaurant.deleteMany({
            where: {
                restaurant_id: restaurant.getID()
            }
        });

        return result.count === 1;
    }

    public async updateRestaurant(restaurant: Restaurant) {
        const result = await global.app.orm.restaurant.updateMany({
            where: {
                restaurant_id: restaurant.getID()
            },
            data: {
                name: restaurant.getName(),
                description: restaurant.getDescription(),
                menu_id: restaurant.getMenu().getID(),
                foodtype_id: restaurant.getFoodtype().getID(),
                address_id: restaurant.getAddress().getID(),
                table_map: restaurant.getTablemap()
            }
        });

        return result.count === 1;
    }
}