import Country from "./Country";

export default class Voivodeship {
    private id: number;
    private name: string;
    private country: Country;

    constructor(id: number, name: string, country: Country) {
        this.id = id;
        this.name = name;
        this.country = country;
    }
    
    public getID() {
        return this.id;
    }

    public getName() {
        return this.name;
    }

    public setName(newName: string) {
        this.name = newName;
    }

    public getCountry() {
        return this.country;   
    }

    public setCountry(newCountry: Country) {
        this.country = newCountry;
    }

}