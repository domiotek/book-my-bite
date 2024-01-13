
export default class RestaurantRepository {


    public async getByID(ID: number) {
        const country = await global.app.orm.country.findUnique({where: {country_id: ID}});

        console.log(country);
    }

    public create() {

    }
}