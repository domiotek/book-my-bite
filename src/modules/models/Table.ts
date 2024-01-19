import Restaurant from "./Restaurant";


export default class Table {
    private id: number;
    private restaurant: Restaurant;
    private name: string;
    private description: string;
    private minClients: number;
    private maxClients: number;

    constructor(id: number, restaurant: Restaurant, name: string, description: string, minClients: number, maxClients: number) {
        this.id = id;
        this.restaurant = restaurant;
        this.name = name;
        this.description = description;
        this.minClients = minClients;
        this.maxClients = maxClients;
    }

    public getID(): number {
        return this.id;
    }

    public getRestaurant(): Restaurant {
        return this.restaurant;
    }

    public getName(): string {
        return this.name;
    }

    public getDescription(): string {
        return this.description;
    }

    public getMinClients(): number {
        return this.minClients;
    }

    public getMaxClients(): number {
        return this.maxClients;
    }

    public setRestaurant(restaurant: Restaurant): void {
        this.restaurant = restaurant;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public setMinClients(minClients: number): void {
        this.minClients = minClients;
    }

    public setMaxClients(maxClients: number): void {
        this.maxClients = maxClients;
    }
}