import {FastifyReply, FastifyRequest} from "fastify";
import TableRepository from "../repositories/TableRepository.js";
import BookingRepository from "../repositories/BookingRepository.js";
import {DateTime} from "luxon";
import { GetTableAvailabilityEndpoint, TableMap } from "../../public/types/api.js";
import Booking from "../models/Booking.js";

export default class TableController {

    public static async getTablesAvailability(req: FastifyRequest, res: FastifyReply) {
        const tableRepository = new TableRepository();
        const bookingRepository = new BookingRepository();

        let result: GetTableAvailabilityEndpoint.IResponse = {
            status: "Failure",
            errCode: "BadRequest"
        }

        res.status(400);

        try {
            const reqQuery = req.params as GetTableAvailabilityEndpoint.IParams;

            if (!reqQuery.restaurantID) {
                result.message = "Missing restaurantID";

                return result;
            }

            if (!reqQuery.dateTime) {
                result.message = "Missing dateTime";

                return result;
            }

            const datetime = DateTime.fromISO(reqQuery.dateTime);

            if(!datetime.isValid) {
                result.message = "Invalid dateTime. ISO format required.";

                return result;
            }

            const restaurantTables = await tableRepository.getRestaurantTables(+reqQuery.restaurantID);

            if (restaurantTables==null) {
                res.status(404);
                result.errCode = "NoEntity";
                result.message = "Couldn't find such restaurant.";

                return result;
            }

            const restaurantBookings = await bookingRepository.getRestaurantBookings(+reqQuery.restaurantID, datetime) as Booking[];

            const tableStatuses: TableMap.ITableAvailability[] = restaurantTables.map(table => {
                for (const booking of restaurantBookings) {
                    if (booking.getTable().getID() === table.getID()) {
                        const start = booking.getDatetime().minus({hour: 3});
                        const end = booking.getDatetime().plus({hour: 3});

                        if (datetime > start && datetime < end) {
                            return {
                                id: table.getID(),
                                isBooked: true
                            }
                        }
                    }
                }

                return {
                    id: table.getID(),
                    isBooked: false
                }
            });

            res.status(200);
            result = {
                status: "Success",
                data: tableStatuses
            }

            return result;
        } catch (e: any) {
            res.status(500);

            result = {
                status: "Failure",
                errCode: "InternalError",
                message: e.message
            }

            return result;
        }
    }
}