import { FastifyReply, FastifyRequest } from 'fastify';
import BookingRepository from "../repositories/BookingRepository.js";
import SessionRepository from '../repositories/SessionRepository.js';
import { DateTime } from 'luxon';
import { CreateReservationEndpoint, DeleteBookingEndpoint, GetUserBookingsEndpoint } from '../../public/types/api.js';
import TableRepository from '../repositories/TableRepository.js';
import Output from '../Output.js';
import Booking from '../models/Booking.js';

export default class BookingController {
    public static readonly bookingRepo = new BookingRepository();
    public static readonly sessionRepo = new SessionRepository();
    public static readonly tableRepo = new TableRepository();

    public static async getUserBookings(req: FastifyRequest, res: FastifyReply) {

        let result: GetUserBookingsEndpoint.IResponse = {
            status: "Failure",
            errCode: "InternalError"
        }

        try {
            const sessionId = req.cookies['session'];
            let session;

            if (sessionId && (session = await BookingController.sessionRepo.getSessionByID(sessionId))) {

                const bookings = await BookingController.bookingRepo.getUserBookings(session.getUser().getID()) as Booking[];

                const bookingsMapped = bookings.map((booking) => ({
                    id: booking.getID(),
                    clients: booking.getClients(),
                    restaurantName: booking.getTable().getRestaurant().getName(),
                    location: booking.getTable().getRestaurant().getAddress().getCity().getName() + " " + booking.getTable().getRestaurant().getAddress().getStreetName() + " " + booking.getTable().getRestaurant().getAddress().getBuildingNumber(),
                    datetime: booking.getDatetime().toFormat("dd-MM-yyyy HH:mm")
                }));

                res.status(200);

                result = {
                    status: "Success",
                    data: bookingsMapped
                }
    
                return result;
            }

            res.status(401);
            result.errCode = "Unauthorized";
            result.message = "You need to be signed in to access this data.";
        } catch (e: any) {
            res.status(500);
            Output.init().bg("red").fg("white").print(`[Endpoint][getUserBookings] Err: ${e.message}`);
        }

        return result;
    }

    public static async deleteBooking(req: FastifyRequest, res: FastifyReply) {

        let result: DeleteBookingEndpoint.IResponse = {
            status: "Failure",
            errCode: "BadRequest"
        }

        try {
            const reqQuery = req.params as DeleteBookingEndpoint.IParams;

            const booking = await BookingController.bookingRepo.getBooking(parseInt(reqQuery.id ?? ""));

            if(!booking) {
                res.status(404);
                result.errCode = "NoEntity";
                result.message = "No such booking.";

                return result;
            }

            const sessionId = req.cookies['session'];
            let session;

            res.status(401);
            result.errCode = "Unauthorized";

            if (!sessionId || (session = await BookingController.sessionRepo.getSessionByID(sessionId))==null) {
                result.message = "You need to be signed in.";

                return result;
            }

            if(session.getUser().getID()!=booking.getUser().getID()) {
                result.message = "You can't delete booking that doesn't belong to you.";

                return result;
            }

            const deleted = await BookingController.bookingRepo.deleteBooking(booking.getID());

            if(deleted) {
                res.status(200);
                result = {
                    status: "Success",
                    data: undefined
                }

                return result;

            }else throw new Error("Unknown DB error.");
        } catch (e: any) {
            res.status(500);
            Output.init().bg("red").fg("white").print(`[Endpoint][deleteBooking] Err: ${e.message}`)
            result = {
                status: "Failure",
                errCode: "InternalError"
            }

            return result;
        }
    }

    public static async createBooking(req: FastifyRequest, res: FastifyReply) {

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

            const table = await BookingController.tableRepo.getTableByID(tableID);

            if(!table) {
                result.errCode = "NoEntity";
                result.message = "No such table.";
                return result;
            }
            
            const sessionID = req.cookies["session"] ?? "";
            let session;

            if ((session = await BookingController.sessionRepo.getSessionByID(sessionID))==null) {
                res.status(401);

                result.errCode = "Unauthorized";
                result.message = "You need to be signed in.";

                return result;
            }
            const userID = session.getUser().getID();


            const repoResult = await BookingController.bookingRepo.createBooking(userID, tableID, datetime, clientCount);

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

            Output.init().bg("red").fg("white").print(`[Endpoint][createBooking] Err: ${e.message}`);

            result = {
                status: "Failure",
                errCode: "InternalError"
            }

            return result;
        }
    }
}