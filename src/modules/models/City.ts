import { DataTypes } from "sequelize";

export const City = global.app.orm.define('City', {
    city_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING(255)
  }, {
    timestamps: false
});