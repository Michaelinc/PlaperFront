import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SavingaccountComponent } from '../account/savingaccount/savingaccount.component';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { SavingAccount } from 'src/app/model/SavingAccount';
import { GenAccount } from 'src/app/model/GenAccount';
import { Category } from '../model/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  
  constructor(private http : HttpClient){ }

  public saveCategory(model : Category) : Observable<Category> {
    return this.http.post<Category>(environment.apiUrl + 'categorias/crear/',model)
  }

  public editCategory(model : Category) : Observable<Category> {
    return this.http.put<Category>(environment.apiUrl + 'categorias/editar/',model)
  }

  public listCategoryAdd(email : string) : Observable<Array<Category>> {
    return this.http.get<Array<Category>>(environment.apiUrl + 'categorias/listar/*/'+ email)
  }

  public listCategorySpend(email : string) : Observable<Array<Category>> {
    return this.http.get<Array<Category>>(environment.apiUrl + 'categorias/listar/GASTO/'+ email)
  }
}
