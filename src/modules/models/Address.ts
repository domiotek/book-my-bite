import City from "./City";

export default class Address {
    private id: number;
    private streetName: string;
    private city: City;
    private buildingNumber: number;
    private zipCode: string;

    constructor(id: number, city: City, zipCode: string, streetName: string, buildingNumber: number) {
        this.id = id;
        this.streetName = streetName;
        this.city = city;
        this.zipCode = zipCode;
        this.streetName = streetName;
        this.buildingNumber = buildingNumber;
    }

    public getID(): number {
        return this.id;
    }

    public getStreetName(): string {
        return this.streetName;
    }

    public getCity(): City {
        return this.city;
    }

    public getBuildingNumber(): number {
        return this.buildingNumber;
    }

    public getZipCode(): string {
        return this.zipCode;
    }

    public setStreetName(streetName: string): void {
        this.streetName = streetName;
    }

    public setCity(city: City): void {
        this.city = city;
    }

    public setBuildingNumber(buildingNumber: number): void {
        this.buildingNumber = buildingNumber;
    }

    public setZipCode(zipCode: string): void {
        this.zipCode = zipCode;
    }

}