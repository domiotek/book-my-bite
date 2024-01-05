import { DataTypes } from "sequelize";

export const Voivodeship = global.app.orm.define('Voivodeship', {
    voivodeship_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING(40)
  }, {
    timestamps: false
  });