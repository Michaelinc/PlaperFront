import { Group } from './Group'
import { Currency } from './Currency';
import { Bank } from './Bank';
export class CheckBook {
    idAccount : string;
    nameAccount : string;
    bank : Bank; 
    currency :Currency;
    group: Group;
    isActive : string;
    amount : number;
} 