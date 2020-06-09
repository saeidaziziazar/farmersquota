import Model from '../models/model.js';

export default class Order extends Model {
    constructor() {
        super('quotas');
    }

    quotas() {
        console.log(this.id);
        
        return this.hasMany('quotas');
    }
}