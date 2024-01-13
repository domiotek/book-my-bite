import { DateTime } from "luxon";
import Restaurant from "../models/Restaurant";
import User from "../models/User";
import Table from "../models/Table";
import Booking from "../models/Booking";

export default class BookingRepository {

    public async getBooking(bookingID: number) {

    }

    public async getUserBookings(user: User) {

    }

    public async getRastaurantBookings(restaurant: Restaurant, date: DateTime) {

    }

    public async createBooking(user: User, table: Table, datetime: DateTime) {

    }

    public async deleteBooking(booking: Booking) {

    }

}