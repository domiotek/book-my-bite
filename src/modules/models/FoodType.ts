import { DataTypes } from "sequelize";

export const Foodtype = global.app.orm.define('Foodtype', {
    foodtype_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING(40)
  }, {
    timestamps: false
  });
  