import { Address } from "./models/Address.js";
import { Booking } from "./models/Booking.js";
import { City } from "./models/City.js";
import { Community } from "./models/Community.js";
import { Country } from "./models/Country.js";
import { Foodtype } from "./models/FoodType.js";
import { Menu } from "./models/Menu.js";
import { Restaurant } from "./models/Restaurant.js";
import { RestaurantManager } from "./models/RestaurantManager.js";
import { Role } from "./models/Role.js";
import { Table } from "./models/Table.js";
import { User } from "./models/User.js";
import { Voivodeship } from "./models/Voivodeship.js";

export default function() {
    Role.hasMany(User, { foreignKey: 'role_id' });
    User.belongsTo(Role, { foreignKey: 'role_id' });

    User.hasMany(RestaurantManager, { foreignKey: 'user_id' });
    RestaurantManager.belongsTo(User, { foreignKey: 'user_id' });

    Restaurant.hasMany(RestaurantManager, { foreignKey: 'restaurant_id' });
    RestaurantManager.belongsTo(Restaurant, { foreignKey: 'restaurant_id' });

    Foodtype.hasMany(Restaurant, { foreignKey: 'foodtype_id' });
    Restaurant.belongsTo(Foodtype, { foreignKey: 'foodtype_id' });

    Menu.hasOne(Restaurant, { foreignKey: 'menu_id' });
    Restaurant.belongsTo(Menu, { foreignKey: 'menu_id' });

    City.hasMany(Address, { foreignKey: 'city_id' });
    Address.belongsTo(City, { foreignKey: 'city_id' });

    Community.hasMany(Address, { foreignKey: 'community_id' });
    Address.belongsTo(Community, { foreignKey: 'community_id' });

    Country.hasMany(Address, { foreignKey: 'county_id' });
    Address.belongsTo(Country, { foreignKey: 'county_id' });

    Voivodeship.hasMany(Address, { foreignKey: 'voivodeship_id' });
    Address.belongsTo(Voivodeship, { foreignKey: 'voivodeship_id' });

    User.hasMany(Booking, { foreignKey: 'user_id' });
    Booking.belongsTo(User, { foreignKey: 'user_id' });

    Table.hasMany(Booking, { foreignKey: 'table_id' });
    Booking.belongsTo(Table, { foreignKey: 'table_id' });

    Restaurant.hasMany(Table, {foreignKey: "restaurant_id"});
    Table.belongsTo(Restaurant, {foreignKey: "restaurant_id"});

    Booking.hasOne(Table, {foreignKey: "table_id"});
    Table.hasMany(Booking, {foreignKey: "table_id"});
}