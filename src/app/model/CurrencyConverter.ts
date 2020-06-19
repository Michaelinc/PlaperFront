import { SelectItem } from 'primeng/api';

export class CurrencyConverter {
    prices: SelectItem[] = [
        { label: 'USD', value: 1.00 },
        { label: 'EUR', value: 0.89 },
        { label: 'COP', value: 3610.00 }
    ]

    isEnabled(currency: string): boolean {
        if (this.prices.find(cur => cur.label === currency) === null) {
            return false;
        } else {
            return true;
        }
    }

    convert(source: string, target: string, amount: number): number {
        if (this.isEnabled(source) && this.isEnabled(target)) {
            return (amount * this.prices.find(pr => pr.label === target).value / this.prices.find(pr => pr.label === source).value);
        }else{
            return null;
        }
            
    }

}