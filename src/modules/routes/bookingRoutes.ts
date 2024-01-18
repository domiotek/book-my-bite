import BookingController from "../controllers/BookingController.js";

const getUserBookings = {
    method: "GET",
    url: "/api/userBookings",
    handler: BookingController.getUserBookings
}

const deleteBooking = {
    method: "DELETE",
    url: "/api/deleteBooking/:id",
    handler: BookingController.deleteBooking
}

export default [getUserBookings, deleteBooking];