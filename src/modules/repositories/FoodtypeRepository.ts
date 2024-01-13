import Foodtype from "../models/Foodtype.js";


export default class FoodTypeRepository {
    public async getFoodTypes() {
        Foodtype
        const foodTypeRecords = await global.app.orm.foodtype.findMany();
        return foodTypeRecords.map(ft => new Foodtype(ft.foodtype_id, ft.name));
}