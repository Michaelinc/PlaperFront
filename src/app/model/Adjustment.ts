import { Transaction } from './Transaction';

export class Adjustment extends Transaction{
    idCuenta: number;
	saldoAdicional: number;
}