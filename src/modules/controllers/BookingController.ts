import { FastifyReply, FastifyRequest } from 'fastify';
import BookingRepository from "../repositories/BookingRepository.js";

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
}