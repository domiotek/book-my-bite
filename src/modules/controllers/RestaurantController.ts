import { FastifyReply, FastifyRequest } from 'fastify';
import FoodTypeRepository from '../repositories/FoodtypeRepository.js';
import LocationRepository from '../repositories/LocationRepository.js';
import RestaurantRepository from '../repositories/RestaurantRepository.js';
import TableRepository from "../repositories/TableRepository.js";
import { GetTableMapEndpoint } from '../../public/types/api.js';
import Table from '../models/Table.js';
import Output from '../Output.js';

interface IRestaurantFilterOptions {
    city: string
    name: string
    foodType: string
}

export default class RestaurantController {
    public static readonly restaurantRepo = new RestaurantRepository();
    public static readonly foodTypeRepo = new FoodTypeRepository();
    public static readonly locationRepo = new LocationRepository();
    public static readonly tableRepo = new TableRepository();

    public static async getLocationsAndFoodtypes(req: FastifyRequest, res: FastifyReply) {

        try {
            const foodtypes = await RestaurantController.foodTypeRepo.getFoodTypes();
            const locations = await RestaurantController.locationRepo.getCities();

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

        let result: GetTableMapEndpoint.IResponse = {
            status: "Failure",
            errCode: "InternalError"
        }

        try {
            const reqQuery = req.query as GetTableMapEndpoint.IRequest;
            let restaurantID;

            if(!reqQuery.id||(isNaN(restaurantID=parseInt(reqQuery.id)))) {
                res.status(400);
                result.errCode = "BadRequest";
                result.message = reqQuery.id?"Invalid id":"Missing id";

                return result;
            }

            const restaurant = await RestaurantController.restaurantRepo.getRestaurantByID(restaurantID);

            if(!restaurant) {
                res.status(404);
                result.errCode = "NoEntity";
                result.message = "Such restaurant doesn't exist";

                return result;
            }

            const tableMap = restaurant.getTablemap();

            //getRestaurantTables returns null only if there is no restaurant with such id, we checked for that earlier.
            const restaurantTables = await RestaurantController.tableRepo.getRestaurantTables(restaurant.getID()) as Table[];

            const tableMapWithClients = tableMap.tables.map(table => {
                const temp = restaurantTables.filter(tab => tab.getID() === table.id)[0];

                return {
                    ...table,
                    minPeople: temp.getMinClients(),
                    maxPeople: temp.getMaxClients()
                }
            });

            return {
                status: "Success",
                data: Object.assign({}, tableMap, {tables: tableMapWithClients})
            }
        } catch (e: any) {
            Output.init().bg("red").fg("white").print(`[Endpoint Error][${this.name}] ${e.message}`);
            res.status(500);
            return {
                status: "Failure",
                errCode: "InternalError"
            }
        }
    }

    public static async getRestaurant(req: FastifyRequest, res: FastifyReply) {

        try {
            const reqQuery = req.query as { id: string };

            const restaurant = await RestaurantController.restaurantRepo.getRestaurantByID(+reqQuery.id);

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
