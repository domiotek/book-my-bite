import { DataTypes } from "sequelize";

export const RestaurantManager = global.app.orm.define('RestaurantManager', {
    restaurant_manager_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    restaurant_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Restaurants',
        key: 'restaurant_id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'user_id'
      }
    }
  }, {
    timestamps: false
  });