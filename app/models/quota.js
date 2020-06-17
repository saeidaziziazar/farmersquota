import Model from '../models/model.js';

export default class Quota extends Model {
    constructor() {
        super();
    }

    static getQuotaByNumber(contract_number) {
        let query = "SELECT * FROM " + this.getTableName() + " WHERE `contract_number` = " + contract_number;

        let quota = new Quota;
        connection.query(query, function (error, result, fields) {
            if (error) throw error;
            
            if (result.length != 0) {
                for (let [key, value] of Object.entries(result[0])) {
                    quota[key] = value;
                }
            }
        })
        
        return quota;
    }

}