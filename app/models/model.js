import Quota from '../models/quota.js';

export default class Model {
    constructor() {

    }

    static find(id) {
        let query = "SELECT * FROM " + this.getTableName() + " WHERE `contract_number` = " + id;

        let model = new Model();
        connection.query(query, function (error, result, fields) {
            if (error) throw error;
            
            if (result.length != 0) {
                for (let [key, value] of Object.entries(result[0])) {
                    model[key] = value;
                }
            }
        })

        return model;
    }

    static getTableName() {
        if  (this.table_name) {
            return this.table_name
        } else {
            return (this.name + 's').toLocaleLowerCase();
        }
    }
}