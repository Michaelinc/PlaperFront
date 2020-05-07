import { Group } from './Group'
import { Currency } from './Currency';
export class Wallet {
    idAccount : string;
    nameAccount : string;
    currency :Currency;
    group: Group;
    isActive : string;
    amount : number;
} 