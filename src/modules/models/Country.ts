
export default class Country {
    private id: number;
    private name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
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

}