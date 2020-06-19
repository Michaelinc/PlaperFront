import { Transaction } from './Transaction';

export class TransferView extends Transaction{
    idCuentaOrigen : any;
	idCuentaDestino : any;
	cantidadEnviada : number;
    cantidadRecibida : number;
}