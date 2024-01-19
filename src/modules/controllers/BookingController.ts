import { FastifyReply, FastifyRequest } from 'fastify';
import BookingRepository from "../repositories/BookingRepository.js";
import SessionRepository from '../repositories/SessionRepository.js';
import Booking from '../models/Booking.js';
import { DateTime } from 'luxon';

export default class BookingController {

    public static async getUserBookings(req: FastifyRequest, res: FastifyReply) {
        const bookingRepo = new BookingRepository();

        try {
            const reqQuery = req.query as { id: string };

            const bookings = await  bookingRepo.getUserBookings(+reqQuery.id);

            const bookingsMapped = bookings?.map((booking) => ({
                id: booking.getID(),
                clients: booking.getClients(),
                restaurantName: booking.getTable().getRestaurant().getName(),
                location: booking.getTable().getRestaurant().getAddress().getCity().getName() + " " + booking.getTable().getRestaurant().getAddress().getStreetName() + " " + booking.getTable().getRestaurant().getAddress().getBuildingNumber(),
                datetime: booking.getDatetime().toFormat("dd-MM-yyyy HH:mm")
            }));

            return {
                bookings: bookingsMapped
            };
        } catch (e) {
            res.status(500);
            return {
                error: e
            }
        }
    }

    public static async deleteBooking(req: FastifyRequest, res: FastifyReply) {
        const bookingRepo = new BookingRepository();

        try {
            const reqQuery = req.query as { id: string };

            const deleted = await bookingRepo.deleteBooking(+reqQuery.id);

            return {
                deleted: deleted
            };
        } catch (e) {
            res.status(500);
            return {
                error: e
            }
        }
    }

    public static async createBooking(req: FastifyRequest, res: FastifyReply) {

        const sessionRepo = new SessionRepository();
        const bookingRepo = new BookingRepository();
        
        try {
            const reqQuery = req.body as { datetime?: string, tableID?: string, clients?: string };

            //check if datetime, tableID and clients are provided and then convert respectively to DateTime, number and number
            const datetime = reqQuery.datetime ? DateTime.fromISO(reqQuery.datetime) : null;
            const tableID = reqQuery.tableID ? +reqQuery.tableID : null;
            const clients = reqQuery.clients ? +reqQuery.clients : null;

            //check if datetime, tableID and clients are not null
            if (!datetime || !tableID || !clients) {
                res.status(400);
                return {
                    error: "Bad request"
                }
            }
            
            const sessionID = req.cookies["session"];
            if (!sessionID) {
                res.status(401);
                return {
                    error: "Unauthorized"
                }
            }
            const session = await sessionRepo.getSessionByID(sessionID);
            const user_id = session?.getUser().getID();
            if (!user_id) {
                res.status(401);
                return {
                    error: "Unauthorized"
                }
            }
            // console.log({
            //     user_id: 1,
            //     table_id: tableID,
            //     datetime: datetime,
            //     clients: clients
            
            // })


            const result = await bookingRepo.createBooking(1, tableID, datetime, clients);

            if (result) {
                res.status(200);
                return {
                    status: "Success"
                }
            } else {
                res.status(500);
                return {
                    error: "No restaurant"
                }
            }

        } catch (e) {
            res.status(500);
            return {
                error: e
            }
        }
    }
}