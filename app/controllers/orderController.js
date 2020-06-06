import * as order from '../models/order.js';
import Quota from '../models/quota.js';

export function getOrdersOfCustomer() {
    
}

export function getQuota(contract_number) {
    return Quota.find(contract_number);
}