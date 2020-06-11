import Model from '../models/model.js';

export default class Order extends Model {
    constructor() {
        super();
    }

    quotas() {
        return this.hasMany('quotas');
    }
}