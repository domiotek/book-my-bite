import Role from "../models/Role.js";
import User from "../models/User.js";

export default class UserRepository {

    public async getUserByID(id: number) {
        const userRecord= await global.app.orm.user.findUnique({
            include: {
                role: true
            },
            where: {
                user_id: id
            }
        });

        if (!userRecord) {
            return null;
        }

        const role= new Role(userRecord.role.role_id, userRecord.role.name);
        return new User(userRecord.user_id, userRecord.email, userRecord.password_hash, userRecord.name, userRecord.surname, userRecord.phone, role);
    }

    public async getUserByEmail(email: string) {
        const userRecord= await global.app.orm.user.findUnique({
            include: {
                role: true
            },
            where: {
                email: email
            }
        })

        if (!userRecord) {
            return null;
        }

        const role= new Role(userRecord.role.role_id, userRecord.role.name);
        return new User(userRecord.user_id, userRecord.email, userRecord.password_hash, userRecord.name, userRecord.surname, userRecord.phone, role);
    }

    public async createUser(email: string, password: string, name: string, surname: string, phone: string, role: number=1) {
        try {
            await global.app.orm.user.createMany({
                data: [
                    {
                        email: email,
                        password_hash: password,
                        name: name,
                        surname: surname,
                        phone: phone,
                        role_id: role
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