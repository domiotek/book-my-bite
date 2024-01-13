import Voivodeship from "./Voivodeship";

export default class City {
    private id: number;
    private name: string;
    private voivodeship: Voivodeship;

    constructor(id: number, name: string, voivodeship: Voivodeship) {
        this.id = id;
        this.name = name;
        this.voivodeship = voivodeship;
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

    public getVoivodeship() {
        return this.voivodeship;   
    }

    public setVoivodeship(newVoivodeship: Voivodeship) {
        this.voivodeship = newVoivodeship;
    }

}