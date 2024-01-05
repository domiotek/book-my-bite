import { DataTypes } from "sequelize";

export const Table = global.app.orm.define('Tables', {
    table_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    restaurant_id: {
      type: DataTypes.INTEGER
    },
    table_name: DataTypes.STRING(30),
    description: DataTypes.STRING(255),
    max_clients_number: DataTypes.INTEGER 
  }, {
    timestamps: false
  });