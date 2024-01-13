import { DateTime } from "luxon";
import Restaurant from "../models/Restaurant.js";
import User from "../models/User.js";
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

        const table = new Table(result.table.table_id, restaurant, result.table.table_name, result.table.description, result.table.max_clients_number);
        return new Booking(result.booking_id, user, table, DateTime.fromJSDate(result.datetime));
    }

    public async getUserBookings(user: User) {
        const bookingRecords = await global.app.orm.booking.findMany({
            include: {
                table: true
            },
            where: {
                user_id: user.getID()
            }
        })

        const restaurantRepository = new RestaurantRepository();

        const bookings = [];

        for (const record of bookingRecords) {
            const restaurant = await restaurantRepository.getRestaurantByID(record.table.restaurant_id)
            if (!restaurant) {
                continue;
            }

            const table = new Table(record.table_id, restaurant, record.table.table_name, record.table.description, record.table.max_clients_number);
            const booking = new Booking(record.booking_id, user, table, DateTime.fromJSDate(record.datetime));
            bookings.push(booking);
        }

        return bookings;
    }

    public async getRestaurantBookings(restaurant: Restaurant, datetime: DateTime) {
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
                    restaurant_id: restaurant.getID()
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
            const table = new Table(record.table_id, restaurant, record.table.table_name, record.table.description, record.table.max_clients_number);
            const booking = new Booking(record.booking_id, user, table, DateTime.fromJSDate(record.datetime));
            bookings.push(booking);
        }

        return bookings;
    }

    public async createBooking(booking: Booking) {
        try {
            await global.app.orm.booking.createMany({
                data: [
                    {
                        user_id: booking.getUser().getID(),
                        table_id: booking.getTable().getID(),
                        datetime: booking.getDatetime().toJSDate()
                    }
                ]
            });
        } catch (e) {
            return false;
        }

        return true;
    }

    public async deleteBooking(booking: Booking) {
        const result = await global.app.orm.booking.deleteMany({
            where: {
                booking_id: booking.getID()
            }
        });

        return result.count === 1;
    }

}