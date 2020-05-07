import { Group } from './Group'
import { Currency } from './Currency';
import { Bank } from './Bank';
export interface InterAccount {
    idAccount : string;
    nameAccount : string;
    bank : Bank; 
    currency :Currency;
    group: Group;
    isActive : string;
    amount : number;
    description : string;
} 