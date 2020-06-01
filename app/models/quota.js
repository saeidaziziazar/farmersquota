class Quota {
    static find(id) {
        let query = "SELECT * FROM quotas WHERE contract_number = " + id;

        connection.query(query, (error, result, fields) => {
            if (!error) {
                return result;
            }
        })
    }
}