import Foodtype from "../models/Foodtype.js";

export default class FoodTypeRepository {
    public async getFoodTypes() {
        const foodTypeRecords = await global.app.orm.foodtype.findMany();

        return foodTypeRecords.map(ft => new Foodtype(ft.foodtype_id, ft.name));
    }

    public async getFoodTypesForHomePage() {
        const foodTypeRecords = await global.app.orm.foodtype.findMany();

        return foodTypeRecords.map(ft => new Foodtype(ft.foodtype_id, ft.name))
            .filter(ft => ![3, 4, 5].includes(ft.getID()));
    }
}