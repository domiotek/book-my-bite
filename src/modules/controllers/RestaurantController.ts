import { FastifyReply, FastifyRequest } from 'fastify';
import FoodTypeRepository from '../repositories/FoodtypeRepository.js';
import LocationRepository from '../repositories/LocationRepository.js';
import RestaurantRepository from '../repositories/RestaurantRepository.js';
import TableRepository from "../repositories/TableRepository.js";

interface IRestaurantFilterOptions {
    city: string
    name: string
    foodType: string
}

export default class RestaurantController {

    public static async getLocationsAndFoodtypes(req: FastifyRequest, res: FastifyReply) {
        const foodtypeRepo = new FoodTypeRepository();
        const locationRepo = new LocationRepository();

        try {
            const foodtypes = await foodtypeRepo.getFoodTypes();
            const locations = await locationRepo.getCities();

            const foodtypesMapped = foodtypes.map((foodtype) => ({
                id: foodtype.getID(),
                name: foodtype.getName()
            }));

            const locationsMapped = locations.map((location) => ({
                id: location.getID(),
                name: location.getName()
            }));

            return {
                foodtypes: foodtypesMapped,
                locations: locationsMapped
            }
        } catch (e) {
            res.status(500);
            return {
                error: 'Internal Server Error'
            }
        }

    }

    public static async getRestaurants(req: FastifyRequest, res: FastifyReply) {
        const restaurantRepo = new RestaurantRepository();

        try {
            const reqQuery = req.query as IRestaurantFilterOptions;

            const filters = {
                city: (+reqQuery.city) ? +reqQuery.city : undefined,
                name: (reqQuery.name !== 'null' && reqQuery.name !== '') ? reqQuery.name : undefined,
                foodType: (+reqQuery.foodType) ? +reqQuery.foodType : undefined
            };

            const restaurants = await restaurantRepo.getRestaurants(filters);

            const restaurantsMapped = restaurants?.map((restaurant) => ({
                id: restaurant?.getID(),
                name: restaurant?.getName(),
                location: restaurant?.getAddress().getCity().getName() + ', ' + restaurant?.getAddress().getStreetName() + ' ' + restaurant?.getAddress().getBuildingNumber(),
                foodtype: restaurant?.getFoodtype().getName(),
                imgUrl: restaurant?.getImage()
            }));

            return {
                restaurants: restaurantsMapped
            }

        } catch (e) {
            res.status(500);
            return {
                error: e
            }
        }
    }

    public static async getRestaurantTableMap(req: FastifyRequest, res: FastifyReply) {
        const restaurantRepo = new RestaurantRepository();
        const tableRepo = new TableRepository();

        try {
            const reqQuery = req.query as { id: string };

            const restaurant = await restaurantRepo.getRestaurantByID(+reqQuery.id);

            if (!restaurant) {
                return null;
            }

            const tableMap = restaurant?.getTablemap();

            if (!tableMap) {
                return null;
            }

            const restaurantTables = await tableRepo.getRestaurantTables(restaurant.getID());
            if (!restaurantTables) {
                return null;
            }

            const tableMapWithClients = tableMap.tables.map(table => {
                const temp = restaurantTables.filter(tab => tab.getID() === table.id)[0];

                return {
                    ...table,
                    minPeople: temp.getMinClients(),
                    maxPeople: temp.getMaxClients()
                }
            });

            return {
                tablemap: tableMapWithClients
            }
        } catch (e) {
            console.log(e);
            res.status(500);
            return {
                error: e
            }
        }
    }

    public static async getRestaurant(req: FastifyRequest, res: FastifyReply) {
        const restaurantRepo = new RestaurantRepository();

        try {
            const reqQuery = req.query as { id: string };

            const restaurant = await restaurantRepo.getRestaurantByID(+reqQuery.id);

            const restaurantMapped = {
                name: restaurant?.getName(),
                description: restaurant?.getDescription(),
                location: restaurant?.getAddress().getCity().getName() + ', ' + restaurant?.getAddress().getStreetName() + ' ' + restaurant?.getAddress().getBuildingNumber(),
                foodtype: restaurant?.getFoodtype().getName(),
                menu: restaurant?.getMenu().getUrl(),
                tablesMap: restaurant?.getTablemap(),
                imgUrl: restaurant?.getImage()
            }

            return {
                restaurant: restaurantMapped
            }

        } catch (e) {
            res.status(500);
            return {
                error: e
            }
        }
    }
}