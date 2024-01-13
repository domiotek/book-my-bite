import { DateTime } from "luxon";
import Restaurant from "../models/Restaurant";
import User from "../models/User";
import Table from "../models/Table";
import Booking from "../models/Booking";
import Menu from "../models/Menu";
import Foodtype from "../models/Foodtype";
import Address from "../models/Address";
import UserRepository from "./UserRepository";

export default class BookingRepository {

    public async getBooking(bookingID: number) {
        // const result = await global.app.orm.booking.findUnique({
        //     include: {
        //         user: true,
        //         table: {
        //             include: {
        //                 restaurant: {
        //                     include: {
        //                         menu: true,
        //                         foodtype: true,
        //                         address: {
        //                             include:
        //                         }
        //                     }
        //                 }
        //             }
        //         }
        //     },
        //     where: {
        //         booking_id: bookingID
        //     }
        // });
        //
        // if (!result) {
        //     return null;
        // }
        //
        // const menu = new Menu(result.table.restaurant.menu.menu_id, result.table.restaurant.menu.url);
        //
        // const foodType = new Foodtype();
        //
        // const address = new Address();
        //
        // const restaurant = new Restaurant(result.table.restaurant.restaurant_id, result.table.restaurant.name, result.table.restaurant.description, menu, foodType, address, result.table.restaurant.table_map as any);
        //
        // const table = new Table(result.table.table_id, restaurant, result.table.table_name, result.table.description, result.table.max_clients_number);
        //
        // const userRepository = new UserRepository();
        //
        // const user = await userRepository.getUserByID(result.user_id);
        //
        // if (user == null) {
        //     return null;
        // }
        //
        // return new Booking(result.booking_id, user, table, DateTime.fromJSDate(result.datetime));
    }

    public async getUserBookings(user: User) {
        // const result = await global.app.orm.booking.findMany({
        //     where: {
        //         user_id: user.getID()
        //     }
        // });
    }

    public async getRestaurantBookings(restaurant: Restaurant, datetime: DateTime) {
        // await global.app.orm.booking.findMany({
        //
        // });
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