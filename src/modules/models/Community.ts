import { DataTypes } from "sequelize";

export const Community = global.app.orm.define('Community', {
    community_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING(40)
  }, {
    timestamps: false
  });