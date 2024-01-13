import Role from "../models/Role";
import User from "../models/User";


export default class UserRepository {

    public async getUserByID(id: number) {

    }

    public async getUserByEmail(email: string) {

    }

    public async createUser(email: string, password: string, name: string, surname: string, phone: string, role: Role ) {

    }

    public async updateUser(user: User) {

    }

    public async deleteUser(user: User) {
        
    }
}