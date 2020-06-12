export default class Model {
    constructor() {
    
    }

    static getTableName() {
        if  (this.table_name) {
            return this.table_name
        } else {
            return (this.name + 's').toLocaleLowerCase();
        }
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
        let insertedId;
        let query;
        let data = {};

        Object.keys(this).forEach((item) => {
            data[item] = this[item];
        });

        setTimeout(() => {
            if (this.id) {
                query = "UPDATE " + this.constructor.getTableName() + " SET ? WHERE id = " + this.id;
            } else {
                query = "INSERT INTO " + this.constructor.getTableName() + " SET ?";
            }
            connection.query(query, data, function (error, result, fields) {
                if (error) throw error;
                insertedId = result.insertId;
            })
        }, 100);

        setTimeout(() => {
            if (insertedId != 0)
                this.id = insertedId;
        }, 200);
    }

    hasMany(ref_table) {
        let foreign = this.constructor.name.toLocaleLowerCase() + "_id";
        let query = "SELECT * FROM " + ref_table + " WHERE " + foreign + " = " + this.id;

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
}