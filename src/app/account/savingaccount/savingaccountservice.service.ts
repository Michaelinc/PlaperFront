import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SavingaccountComponent } from './savingaccount.component';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SavingAccount } from 'src/app/model/SavingAccount';

@Injectable({
  providedIn: 'root'
})
export class SavingaccountserviceService {
  
  constructor(private http : HttpClient){ }

  public saveSavingAccount(model : SavingAccount) : Observable<SavingAccount> {
    return this.http.post<SavingAccount>(environment.apiUrl + '/cuentaahorro',model)
  }

  public saveSavingAccountPrueba(model : SavingAccount) : SavingAccount {
    return model;
  }
}
