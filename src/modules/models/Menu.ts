import { DataTypes } from "sequelize";

export const Menu = global.app.orm.define('Menu', {
    menu_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    url: DataTypes.STRING(255)
  }, {
    timestamps: false
});