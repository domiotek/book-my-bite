import { DataTypes } from "sequelize";

export const Address = global.app.orm.define('Address', {
    address_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    city_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Cities',
        key: 'city_id'
      }
    },
    street_name: DataTypes.STRING(40),
    building_number: DataTypes.STRING(40),
    zip_code: DataTypes.STRING(6),
    community_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Communities',
        key: 'community_id'
      }
    },
    county_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Countries',
        key: 'country_id',
      }
    },
    voivodeship_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Voivodeships',
        key: 'voivodeship_id'
      }
    }
  }, {
    timestamps: false
  });