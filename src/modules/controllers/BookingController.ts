import { FastifyReply, FastifyRequest } from 'fastify';
import BookingRepository from "../repositories/BookingRepository.js";
import SessionRepository from '../repositories/SessionRepository.js';

export default class BookingController {

    public static async getUserBookings(req: FastifyRequest, res: FastifyReply) {
        const bookingRepo = new BookingRepository();
        const sessionRepo = new SessionRepository();

        try {
            const sessionId = req.cookies['session'];
            let session;

            if (sessionId && (session = await sessionRepo.getSessionByID(sessionId))) {

                const bookings = await  bookingRepo.getUserBookings(session.getUser().getID());
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
                
            }

            res.status(401);
            return {
                error: 'Unauthorized user'
            }

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
            const reqQuery = req.params as { id: string };

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
}