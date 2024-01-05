import { DataTypes } from 'sequelize';



export const User = global.app.orm.define('User', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: DataTypes.STRING(40),
  password_hash: DataTypes.STRING(255),
  name: DataTypes.STRING(40),
  surname: DataTypes.STRING(40),
  phone: DataTypes.STRING(15),
  role_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: false
});
