import { Group } from './Group'
import { Currency } from './Currency';
import { Bank } from './Bank';
export class CreditCard {
    idAccount : string;
    nameAccount : string;
    bank : Bank;
    currency :Currency;
    group: Group;
    isActive : string;
    totalPasive : number;
    limitCredit : number;
} 