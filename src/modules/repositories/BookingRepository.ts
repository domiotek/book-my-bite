import { DateTime } from "luxon";
import Restaurant from "../models/Restaurant.js";
import Table from "../models/Table.js";
import Booking from "../models/Booking.js";
import UserRepository from "./UserRepository.js";
import RestaurantRepository from "./RestaurantRepository.js";

export default class BookingRepository {

    public async getBooking(bookingID: number) {
        const result = await global.app.orm.booking.findUnique({
            include: {
                user: true,
                table: true
            },
            where: {
                booking_id: bookingID
            }
        });

        if (!result) {
            return null;
        }

        const userRepository = new UserRepository();
        const user = await userRepository.getUserByID(result.user_id);
        if (!user) {
            return null;
        }

        const restaurantRepository = new RestaurantRepository();
        const restaurant = await restaurantRepository.getRestaurantByID(result.table.restaurant_id);
        if (!restaurant) {
            return null;
        }

        const table = new Table(result.table.table_id, restaurant, result.table.table_name, result.table.description, result.table.min_clients, result.table.max_clients);
        return new Booking(result.booking_id, user, table, DateTime.fromJSDate(result.datetime), result.clients);
    }

    public async getUserBookings(id: number) {
        const bookingRecords = await global.app.orm.booking.findMany({
            include: {
                table: true
            },
            where: {
                user_id: id
            }
        })

        const restaurantRepository = new RestaurantRepository();
        const userRepository = new UserRepository();

        const bookings = [];

        for (const record of bookingRecords) {
            const restaurant = await restaurantRepository.getRestaurantByID(record.table.restaurant_id)
            if (!restaurant) {
                continue;
            }

            const user = await userRepository.getUserByID(id);
            if (!user) {
                return null;
            }
            const table = new Table(record.table_id, restaurant, record.table.table_name, record.table.description, record.table.min_clients, record.table.max_clients);
            const booking = new Booking(record.booking_id, user, table, DateTime.fromJSDate(record.datetime), record.clients);
            bookings.push(booking);
        }

        return bookings;
    }

    public async getRestaurantBookings(restaurant_id: number, datetime: DateTime) {
        const bookingRecords = await global.app.orm.booking.findMany({
            include: {
                table: true
            },
            where: {
                datetime: {
                    gte: datetime.startOf("day").toJSDate(),
                    lte: datetime.startOf("day").plus({day: 1}).toJSDate(),
                },
                table: {
                    restaurant_id: restaurant_id
                }
            }
        })

        const restaurantRepository = new RestaurantRepository();
        const userRepository = new UserRepository();

        const bookings = [];

        for (const record of bookingRecords) {
            const restaurant = await restaurantRepository.getRestaurantByID(record.table.restaurant_id)
            if (!restaurant) {
                continue;
            }
            const user = await userRepository.getUserByID(record.user_id);
            if (!user) {
                return null;
            }
            const table = new Table(record.table_id, restaurant, record.table.table_name, record.table.description, record.table.min_clients, record.table.max_clients);
            const booking = new Booking(record.booking_id, user, table, DateTime.fromJSDate(record.datetime), record.clients);
            bookings.push(booking);
        }

        return bookings;
    }

    public async createBooking(user_id: number, table_id: number, datetime: DateTime, clients: number) {
        try {
            await global.app.orm.booking.createMany({
                data: [
                    {
                        user_id: user_id,
                        table_id: table_id,
                        datetime: datetime.toJSDate(),
                        clients: clients
                    }
                ]
            });
        } catch (e) {
            return false;
        }

        return true;
    }

    public async deleteBooking(id: number) {
        const result = await global.app.orm.booking.deleteMany({
            where: {
                booking_id: id
            }
        });

        return result.count === 1;
    }

}