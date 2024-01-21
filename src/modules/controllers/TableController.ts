import {FastifyReply, FastifyRequest} from "fastify";
import TableRepository from "../repositories/TableRepository.js";
import BookingRepository from "../repositories/BookingRepository.js";
import {DateTime} from "luxon";
import {data} from "autoprefixer";

export default class TableController {

    public static async getTablesAvailability(req: FastifyRequest, res: FastifyReply) {
        const tableRepository = new TableRepository();
        const bookingRepository = new BookingRepository();

        try {
            const reqQuery = req.query as {
                restaurantId?: string,
                dateTime?: string
            };

            if (!reqQuery.restaurantId) {
                return {
                    status: "Failure",
                    error: "invalidRestaurantID"
                }
            }

            if (!reqQuery.dateTime) {
                return {
                    status: "Failure",
                    error: "invalidDateTime"
                }
            }

            const datetime = DateTime.fromISO(reqQuery.dateTime);
            const restaurantTables = await tableRepository.getRestaurantTables(+reqQuery.restaurantId);

            if (!restaurantTables) {
                return {
                    status: "Failure",
                    error: "noEntity"
                }
            }

            const restaurantBookings = await bookingRepository.getRestaurantBookings(+reqQuery.restaurantId, datetime);

            if (!restaurantBookings) {
                return {
                    status: "Failure",
                    error: "noEntity"
                }
            }

            const tableStatuses = restaurantTables.map(table => {
                for (const booking of restaurantBookings) {
                    if (booking.getTable().getID() === table.getID()) {
                        const start = booking.getDatetime().minus({hour: 3});
                        const end = booking.getDatetime().plus({hour: 3});

                        if (datetime > start && datetime < end) {
                            return {
                                id: table.getID(),
                                state: "Booked"
                            }
                        }
                    }
                }

                return {
                    id: table.getID(),
                    state: "Free"
                }
            });

            return {
                status: "Success",
                tableStatuses: tableStatuses
            }
        } catch (e) {
            res.status(500);
            return {
                status: "Failure",
                error: e
            }
        }
    }
}