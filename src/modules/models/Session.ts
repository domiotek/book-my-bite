import { DateTime } from "luxon";
import User from "./User";

export default class Session {
    private id: string;
    private user: User;
    private validUntil: DateTime;

    constructor(id: string, user: User, validUntil: DateTime) {
        this.id=id;
        this.user = user;
        this.validUntil = validUntil;
    }

    public getID(): string {
        return this.id;
    }

    public getUser(): User {
        return this.user;
    }

    public getValidUntil(): DateTime {
        return this.validUntil;
    }

    public setUser(user: User): void {
        this.user = user;
    }

    public setValidUntil(datetime: DateTime): void {
        this.validUntil = datetime;
    }

    public isValid() {
        return DateTime.now() <= this.validUntil;
    }

}