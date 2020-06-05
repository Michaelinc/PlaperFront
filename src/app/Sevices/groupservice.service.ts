import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SavingaccountComponent } from '../account/savingaccount/savingaccount.component';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SavingAccount } from 'src/app/model/SavingAccount';
import { GenAccount } from 'src/app/model/GenAccount';
import { Group } from '../model/Group';

@Injectable({
  providedIn: 'root'
})
export class GroupserviceService {
  
  constructor(private http : HttpClient){ }

  public saveGroup(model : Group) : Observable<Group> {
    return this.http.post<Group>(environment.apiUrl + 'grupos/crear/',model)
  }

  public listGroup(email : string) : Observable<Array<Group>> {
    return this.http.get<Array<Group>>(environment.apiUrl + 'grupos/listar/'+ email)
  }
}
