import { FastifyReply, FastifyRequest } from 'fastify';
import FoodTypeRepository from '../repositories/FoodtypeRepository.js';
import LocationRepository from '../repositories/LocationRepository.js';
import RestaurantRepository from '../repositories/RestaurantRepository.js';

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
                location: restaurant?.getAddress().getCity().getName(),
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
}