import FoodTypeRepository from "../repositories/FoodtypeRepository.js";
import {FastifyReply, FastifyRequest} from "fastify";

export default class FoodTypeController {

    public static async getFoodTypeIDs(req: FastifyRequest, res: FastifyReply) {
        const foodTypeRepository = new FoodTypeRepository();

        try {
            const foodTypesForHomePage = await foodTypeRepository.getFoodTypesForHomePage();

            if (!foodTypesForHomePage) {
                return {
                    status: "Failure",
                    error: "noEntity"
                }
            }

            const foodTypesMapped = foodTypesForHomePage?.map(ft => {
                return {
                    id: ft.getID(),
                    name: ft.getName()
                }
            });

            return {
                status: "Success",
                foodTypes: foodTypesMapped
            };
        } catch (e) {
            res.status(500);
            return {
                status: "Failure",
                error: e
            }
        }
    }
}