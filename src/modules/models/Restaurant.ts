import { DataTypes } from "sequelize";

export const Restaurant = global.app.orm.define('Restaurant', {
    restaurant_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING(40),
    description: DataTypes.TEXT,
    menu_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Menus',
        key: 'menu_id'
      }
    },
    foodtype_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Foodtypes',
        key: 'foodtype_id'
      }
    },
    address_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Addresses',
        key: 'address_id'
      }
    },
    table_map: DataTypes.JSON
  }, {
    timestamps: false
  });