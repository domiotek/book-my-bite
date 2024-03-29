import Address from "./Address";
import Foodtype from "./Foodtype";
import Menu from "./Menu";

interface IDecor {
    x: number,
    y: number,
    label?: string,
    width: number,
    height: number
}

interface ITable {
    x: number,
    y: number,
    id: number,
    name: string,
    type: string,
    width: number,
    height: number,
    minPeople?: number,
    maxPeople?: number
}

interface ITableMap {
    width: number,
    height: number,
    tables: ITable[]
    decors: IDecor[]
}

export default class Restaurant {
    private id: number;
    private name: string;
    private description: string;
    private menu: Menu;
    private foodtype: Foodtype;
    private address: Address;
    private image: string;
    private tablemap: ITableMap;

    constructor(id: number, name: string, description: string, menu: Menu, foodtype: Foodtype, address: Address, image: string, tablemap: ITableMap) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.menu = menu;
        this.foodtype = foodtype;
        this.address = address;
        this.image = image;
        this.tablemap = tablemap;
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

    public getTablemap(): ITableMap {
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

    public setFoodtype(foodType: Foodtype): void {
        this.foodtype = foodType;
    }

    public setAddress(address: Address): void {
        this.address = address;
    }

    public setTablemap(tableMap: ITableMap): void {
        this.tablemap = tableMap;
    }

    public setImage(image: string): void {
        this.image = image;
    }
}