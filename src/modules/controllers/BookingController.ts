import { FastifyReply, FastifyRequest } from 'fastify';
import BookingRepository from "../repositories/BookingRepository.js";
import SessionRepository from '../repositories/SessionRepository.js';
import Booking from '../models/Booking.js';
import { DateTime } from 'luxon';
import { CreateReservationEndpoint } from '../../public/types/api.js';
import TableRepository from '../repositories/TableRepository.js';

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
        const tableRepo = new TableRepository();

        let result: CreateReservationEndpoint.IResponse = {
            status: "Failure",
            errCode: "BadRequest"
        }

        res.status(400);
        
        try {
            const reqQuery = req.body as CreateReservationEndpoint.IBody;

            //check if datetime, tableID and clients are provided and then convert respectively to DateTime, number and number
            const datetime = reqQuery.datetime ? DateTime.fromISO(reqQuery.datetime) : null;
            const tableID = reqQuery.tableID ? +reqQuery.tableID : null;
            const clientCount = reqQuery.numOfClients ? +reqQuery.numOfClients : null;

            //check if datetime, tableID and clients are not null
            if (!datetime || !tableID || !clientCount) {
                result.message = "Missing at least one of required parameters (datetime, tableID, numOfClients)";
                return result;
            }

            if(!datetime.isValid) {
                result.message = "Invalid datetime. ISO format required.";
                return result;
            }

            if(DateTime.now() > datetime) {
                result.message = "Invalid datetime. Can't reserve table in the past.";
                return result;
            }

            const table = await tableRepo.getTableByID(tableID);

            if(!table) {
                result.errCode = "NoEntity";
                result.message = "No such table.";
                return result;
            }
            
            const sessionID = req.cookies["session"] ?? "";
            let session;

            if ((session = await sessionRepo.getSessionByID(sessionID))==null) {
                res.status(401);

                result.errCode = "Unauthorized";
                result.message = "You need to be signed in.";

                return result;
            }
            const userID = session.getUser().getID();


            const repoResult = await bookingRepo.createBooking(userID, tableID, datetime, clientCount);

            if (repoResult) {
                res.status(200);
                
                result = {
                    status: "Success",
                    data: undefined
                }

                return result;
            }else throw new Error("Unexpected DB error.");

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