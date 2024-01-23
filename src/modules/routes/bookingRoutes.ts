import BookingController from "../controllers/BookingController.js";

const getUserBookings = {
    method: "GET",
    url: "/api/userBookings",
    handler: BookingController.getUserBookings
}

const deleteBooking = {
    method: "DELETE",
    url: "/api/booking/:id",
    handler: BookingController.deleteBooking
}

const createBooking = {
    method: "POST",
    url: "/api/booking",
    handler: BookingController.createBooking
}

export default [getUserBookings, deleteBooking, createBooking];