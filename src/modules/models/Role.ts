import { DataTypes } from "sequelize";

export const Role = global.app.orm.define('Role', {
    role_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING(255)
  }, {
    timestamps: false
  });