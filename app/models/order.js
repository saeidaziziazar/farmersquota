import Model from '../models/model.js';
import Quota from './quota.js';

export default class Order extends Model {
    constructor() {
        super();
    }

    quotas() {
        return this.hasMany('quotas');
    }

    static getOrdersByCustomerId(customer_id) {
        let query = "SELECT * FROM " + this.getTableName() + " WHERE `customer_id` = " + customer_id;

        let orders = [];
        connection.query(query, function (error, result, fields) {
            if (error) throw error;
            
            if (result.length != 0) {
                result.forEach((row) => {
                    let quota = new Quota;
                    for (let [key, value] of Object.entries(row)) {
                        quota[key] = value;
                    }
                    orders.push(quota);
                })
            }
        })
        
        return orders;
    }
}