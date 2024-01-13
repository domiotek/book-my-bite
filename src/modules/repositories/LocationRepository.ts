import City from "../models/City.js";
import Country from "../models/Country.js";
import Voivodeship from "../models/Voivodeship.js";

export default class LocationRepository {
    public async getCities() {
        const cityRecords = await global.app.orm.city.findMany({
            include: {
                voivodeship: {
                    include: {
                        country: true,
                    }
                }
            }
        });
        const citiesArray = [];
        for (const city of cityRecords) {
            const country = new Country(city.voivodeship.country.country_id, city.voivodeship.country.name);
            const voivodeship = new Voivodeship(city.voivodeship.voivodeship_id, city.voivodeship.name, country);
            citiesArray.push(new City(city.city_id, city.name, voivodeship));
        }
        return citiesArray;
    }
}
