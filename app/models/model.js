export default class Model {
    constructor() {
    
    }

    static find(id) {
        let query = "SELECT * FROM " + this.getTableName() + " WHERE `id` = " + id;

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

    save() {
        let data = {};
        let query = "INSERT INTO " + this.constructor.getTableName() + " SET ?";

        Object.keys(this).forEach((item) => {
            data[item] = this[item];
        })

        connection.query(query, data, function (error, result, fields) {
            if (error) throw error;
        })
    }

    static getTableName() {
        if  (this.table_name) {
            return this.table_name
        } else {
            return (this.name + 's').toLocaleLowerCase();
        }
    }

    hasMany(ref_table) {
        console.log(ref_table, this.constructor.name);
    }
}