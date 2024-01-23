import { GetHomePageFoodTypesEndpoint } from "../../public/types/api.js";
import Output from "../Output.js";
import FoodTypeRepository from "../repositories/FoodtypeRepository.js";
import {FastifyReply, FastifyRequest} from "fastify";

export default class FoodTypeController {
    public static readonly foodTypeRepo = new FoodTypeRepository();

    public static async getFoodTypeIDs(req: FastifyRequest, res: FastifyReply) {

        let result: GetHomePageFoodTypesEndpoint.IResponse = {
            status: "Failure",
            errCode: "InternalError"
        }

        try {
            const foodTypesForHomePage = await FoodTypeController.foodTypeRepo.getFoodTypesForHomePage();

            const foodTypesMapped = foodTypesForHomePage.map(ft => {
                return {
                    id: ft.getID(),
                    name: ft.getName()
                }
            });

            result = {
                status: "Success",
                data: foodTypesMapped
            }

            return result;
        } catch (e: any) {
            res.status(500);
            Output.init().bg("red").fg("white").print(`[Endpoint][getFoodTypeIDs] Err: ${e.message}`);
            return result;
        }
    }
}