
export default class Menu {

    private id: number;
    private url: string;


    constructor(id: number, url: string) {
        this.id = id;
        this.url = url;
    }

    public getID(): number {
        return this.id;
    }

    public getUrl(): string {
        return this.url;
    }
}