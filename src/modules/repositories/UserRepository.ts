import Role from "../models/Role.js";
import User from "../models/User.js";

export default class UserRepository {

    public async getUserByID(id: number) {
        const result= await global.app.orm.user.findUnique({
            include: {
                role: true
            },
            where: {
                user_id: id
            }
        });

        if (!result) {
            return null;
        }

        const role= new Role(result.role.role_id, result.role.name);

        return new User(result.user_id, result.email, result.password_hash, result.name, result.surname, result.phone, role);
    }

    public async getUserByEmail(email: string) {
        const result= await global.app.orm.user.findUnique({
            include: {
                role: true
            },
            where: {
                email: email
            }
        })

        if (!result) {
            return null;
        }

        const role= new Role(result.role.role_id, result.role.name);

        return new User(result.user_id, result.email, result.password_hash, result.name, result.surname, result.phone, role);
    }

    public async createUser(user: User) {
        try {
            await global.app.orm.user.createMany({
                data: [
                    {
                        email: user.getEmail(),
                        password_hash: user.getPassword(),
                        name: user.getName(),
                        surname: user.getSurname(),
                        phone: user.getPhone(),
                        role_id: user.getRole().getID()
                    }
                ]
            });
        } catch (e) {
            return false;
        }

        return true;
    }

    public async updateUser(user: User) {
        const result = await global.app.orm.user.updateMany({
            where: {
                user_id: user.getID()
            },
            data: {
                email: user.getEmail(),
                password_hash: user.getPassword(),
                name: user.getName(),
                surname: user.getSurname(),
                phone: user.getPhone(),
                role_id: user.getRole().getID()
            }
        });

        return result.count === 1;
    }

    public async deleteUser(user: User) {
        const result = await global.app.orm.user.deleteMany({
            where: {
                user_id: user.getID()
            }
        });

        return result.count === 1;
    }
}