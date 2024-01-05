import { DataTypes } from "sequelize";

export const Booking = global.app.orm.define('Booking', {
    booking_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'user_id',
      }
    },
    table_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Tables',
        key: 'table_id'
      }
    },
    date: DataTypes.DATEONLY,
    hour: DataTypes.TIME
  }, {
    timestamps: false
  });