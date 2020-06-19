import { Transaction } from './Transaction';

export class Transfer extends Transaction{
    idCuentaOrigen : number;
	idCuentaDestino : number;
	cantidadEnviada : number;
    cantidadRecibida : number;
}