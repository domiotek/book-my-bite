import Restaurant from "./Restaurant";
import User from "./User";

export default class RestaurantManager {
    private id: number;
    private restaurant: Restaurant;
    private user: User;

    constructor(id: number, restaurant: Restaurant, user: User) {
        this.id = id;
        this.restaurant = restaurant;
        this.user = user;
    }

    public getID(): number {
        return this.id;
    }

    public getRestaurant(): Restaurant {
        return this.restaurant;
    }

    public getUser(): User {
        return this.user;
    }

    public setRestaurant(restaurant: Restaurant): void {
        this.restaurant = restaurant;
    }

    public setUser(user: User): void {
        this.user = user;
    }
}