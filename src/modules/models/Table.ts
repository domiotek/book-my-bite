import Restaurant from "./Restaurant";


export default class Table {
    private id: number;
    private restaurant: Restaurant;
    private name: string;
    private description: string;
    private maxClientsNumber: number;

    constructor(id: number, restaurant: Restaurant, name: string, description: string, maxClientsNumber: number) {
        this.id = id;
        this.restaurant = restaurant;
        this.name = name;
        this.description = description;
        this.maxClientsNumber = maxClientsNumber;
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

    public getMaxClientsNumber(): number {
        return this.maxClientsNumber;
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

    public setMaxClientsNumber(maxClientsNumber: number): void {
        this.maxClientsNumber = maxClientsNumber;
    }

}