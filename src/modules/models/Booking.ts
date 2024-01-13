import Table from "./Table";
import User from "./User";
import {DateTime} from "luxon";


export default class Booking {
    private id: number;
    private user: User;
    private table: Table
    private datetime: DateTime;

    constructor(id: number, user: User, table: Table, datetime: DateTime) {
        this.id=id;
        this.user = user;
        this.table = table;
        this.datetime = datetime;
    }

    public getID(): number {
        return this.id;
    }

    public getUser(): User {
        return this.user;
    }

    public getTable(): Table {
        return this.table;
    }

    public getDatetime(): DateTime {
        return this.datetime;
    }

    public setUser(user: User): void {
        this.user = user;
    }

    public setTable(table: Table): void {
        this.table = table;
    }

    public setDatetime(datetime: DateTime): void {
        this.datetime = datetime;
    }

}