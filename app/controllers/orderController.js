import * as order from '../models/order.js';
// require('../models/quota.js');

export function getOrdersOfCustomer() {
    
}

export function getQuota(contract_number) {
    return Quota.find(contract_number);
}