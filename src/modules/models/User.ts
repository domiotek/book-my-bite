import Role from "./Role";

export default class User {
    private id: number;
    private email: string;
    private password: string;
    private name: string;
    private surname: string;
    private phone: string;
    private role: Role;

    constructor(id: number, email: string, password: string, name: string, surname: string, phone: string, role: Role) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
        this.surname = surname;
        this.phone = phone;
        this.role = role;
    }

    public getID(): number {
        return this.id;
    }

    public getEmail(): string {
        return this.email;
    }

    public getPassword(): string {
        return this.password;
    }

    public getName(): string {
        return this.name;
    }

    public getSurname(): string {
        return this.surname;
    }

    public getPhone(): string {
        return this.phone;
    }

    public getRole(): Role {
        return this.role;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public setPassword(password: string): void {
        this.password = password;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public setSurname(surname: string): void {
        this.surname = surname;
    }

    public setPhone(phone: string): void {
        this.phone = phone;
    }

    public setRole(role: Role): void {
        this.role = role;
    }
    
}