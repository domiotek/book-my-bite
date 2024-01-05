import { DataTypes } from "sequelize";

export const Country = global.app.orm.define('Country', {
    country_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING(40)
  }, {
    timestamps: false
  });