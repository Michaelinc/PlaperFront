import { Bank } from './Bank';
import { Currency } from './Currency';
import { Category } from './Category';

export class SpendOrEntry {
    id : string;
    nameAccount : string;
    account : Array<any>;
    beneficiary : string; 
    currency :Currency;
    category: Category;
    tag: string;
    isActive : string;
    amount : number;
    description : string;

}