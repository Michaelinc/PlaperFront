import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { User } from '../model/User'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { ChangePassword } from '../model/ChangePassword';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }

  public saveUser(user : User): Observable<User>{
    return this.http.post<User>(environment.apiUrl + 'usuarios/registrar',user);
  }

  public loginUser(user : User): Observable<User>{
    return this.http.put<User>(environment.apiUrl + 'usuarios/login/'+user.email +'/'+ user.password,user);
  }

  public logoutUser(user : User): Observable<boolean>{
    return this.http.put<boolean>(environment.apiUrl + 'usuarios/cerrar-sesion/'+ user.email,user);
  }
  public verifySesionUser(email : string): Observable<boolean>{
    return this.http.get<boolean>(environment.apiUrl + 'usuarios/validar-sesion/'+ email);
  }

  public changePasswordRequest(user : User): Observable<boolean>{
    return this.http.put<boolean>(environment.apiUrl + 'usuarios/solicitar-cambio-contraseña/'+ user.email,user);
  }

  public changePassword(changePassword : ChangePassword): Observable<boolean>{
    console.log(changePassword);
    return this.http.put<boolean>(environment.apiUrl + 'usuarios/cambiar-contraseña/'+ changePassword.link +'/'+ changePassword.password,changePassword);
  }

}
