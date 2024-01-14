import { FastifyReply, FastifyRequest } from 'fastify';
import FoodTypeRepository from '../repositories/FoodtypeRepository.js';
import LocationRepository from '../repositories/LocationRepository.js';

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
}