import Address from "./Address";
import Foodtype from "./Foodtype";
import Menu from "./Menu";

export default class Restaurant {
    private id: number;
    private name: string;
    private description: string;
    private menu: Menu;
    private foodtype: Foodtype;
    private address: Address;
    private tablemap: object;
    private image: string;

    constructor(id: number, name: string, description: string, menu: Menu, foodtype: Foodtype, address: Address, tablemap: object, image: string) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.menu = menu;
        this.foodtype = foodtype;
        this.address = address;
        this.tablemap = tablemap;
        this.image = image;
    }

    public getID(): number {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getDescription(): string {
        return this.description;
    }

    public getMenu(): Menu {
        return this.menu;
    }

    public getFoodtype(): Foodtype {
        return this.foodtype;
    }

    public getAddress(): Address {
        return this.address;
    }

    public getTablemap(): object {
        return this.tablemap;
    }

    public getImage(): string {
        return this.image;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public setMenu(menu: Menu): void {
        this.menu = menu;
    }

    public setFoodtype(foodtype: Foodtype): void {
        this.foodtype = foodtype;
    }

    public setAddress(address: Address): void {
        this.address = address;
    }

    public setTablemap(tablemap: object): void {
        this.tablemap = tablemap;
    }
}