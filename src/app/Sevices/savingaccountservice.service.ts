import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SavingaccountComponent } from '../account/savingaccount/savingaccount.component';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { SavingAccount } from 'src/app/model/SavingAccount';
import { GenAccount } from 'src/app/model/GenAccount';

@Injectable({
  providedIn: 'root'
})
export class SavingaccountserviceService {
  
  constructor(private http : HttpClient){ }

  public saveSavingAccount(model : GenAccount) : Observable<GenAccount> {
    return this.http.post<GenAccount>(environment.apiUrl + 'cuentas/crear/',model)
  }

  public editSavingAccount(model : GenAccount) : Observable<GenAccount> {
    return this.http.put<GenAccount>(environment.apiUrl + 'cuentas/editar/',model)
  }

  public listSavingAccount(email : string) : Observable<Array<GenAccount>> {
    return this.http.get<Array<GenAccount>>(environment.apiUrl + 'cuentas/listar/'+email);
  }

  public removeSavingAccount(email : string) : Observable<Array<GenAccount>> {
    return this.http.get<Array<GenAccount>>(environment.apiUrl + 'cuentas/listar/'+email);
  }

}
