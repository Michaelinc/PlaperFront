import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SavingaccountComponent } from '../account/savingaccount/savingaccount.component';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { SavingAccount } from 'src/app/model/SavingAccount';
import { GenAccount } from 'src/app/model/GenAccount';
import { Group } from '../model/Group';
import { Transaction } from '../model/Transaction';
import { Adjustment } from '../model/Adjustment';
import { Transfer } from '../model/Transfer';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  
  constructor(private http : HttpClient){ }

  public doTransaction(model : Transaction) : Observable<Transaction> {
    return this.http.post<Transaction>(environment.apiUrl + 'transacciones/crear/',model)
  }

  public removeTransaction(id : number) : Observable<Transaction> {
    return this.http.delete<Transaction>(environment.apiUrl + 'transacciones/eliminar/'+id)
  }

  public listTransfer(email : string) : Observable<Array<Transfer>> {
    return this.http.get<Array<Transfer>>(environment.apiUrl + 'transacciones/listar/'+email+'/filtro/TRANSFERENCIA')
  }

  public listAdjustment(email : string) : Observable<Array<Adjustment>> {
    return this.http.get<Array<Adjustment>>(environment.apiUrl + 'transacciones/listar/'+email+'/filtro/AJUSTE')
  }
}