import { Component, OnInit, OnChanges } from '@angular/core';
import { Gender } from '../../model/Gender';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, MinLengthValidator } from '@angular/forms';
import { UserService } from '../../user/user.service';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';

@Component({
  selector: 'app-login-signin',
  templateUrl: './login-signin.component.html',
  styleUrls: ['./login-signin.component.css'],
  providers: [MessageService, ConfirmationService, UserService]
})
export class LoginSigninComponent implements OnInit{

  //FormGroup
  public formGroup: FormGroup;
  display = 0;
  public formGroupLogin: FormGroup;
  public formGroupChangePasswordRequest : FormGroup;
  public formGroupChangePassword : FormGroup;
  olvido: number = 0;


  validFrom = false;

  items: MenuItem[];


  password : any;
  password2: any;



  constructor(private messageService: MessageService, private confirmationService: ConfirmationService, private formBuilder: FormBuilder, public userService: UserService, private router: Router) {

    this.formGroup = this.formBuilder.group(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        nombre: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)])
      }
    );

    this.formGroupLogin = this.formBuilder.group(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)])
      }
    );

    this.formGroupChangePasswordRequest = this.formBuilder.group(
      {
        email: new FormControl('', [Validators.required, Validators.email])
      }
    );

      this.formGroupChangePassword = this.formBuilder.group(
        {
          link : new FormControl('', [Validators.required]),
          password: new FormControl('', [Validators.required, Validators.minLength(8)]),
          password2: new FormControl('', [Validators.required, Validators.minLength(8)])
        }
      );

  }
  

  login() {
    this.userService.loginUser(this.formGroupLogin.value).subscribe(
      res => {
        if (res != null) {
          this.router.navigate(["/menu/" + res.nombre]);
          localStorage.setItem('email', res.email);
          localStorage.setItem('nombre', res.nombre);
        }
      },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Se ha producido un error :  ' + err });
      }
    );
  }

  ngOnInit(): void {
    this.items = [
      {
        label: 'limpiar',
        icon: 'pi pi-fw pi-refresh',
        command: (event) => {
          this.display = 0;
          this.limpiarCampos();
        }
      },
      {
        label: 'Iniciar Sesión',
        icon: 'pi pi-fw pi-home',
        command: (event) => {
          this.display = 1;
          this.limpiarCampos();
        }
      },
      {
        label: 'Registrarme',
        icon: 'pi pi-fw pi-home',
        command: (event) => {
          this.display = 2;
          this.limpiarCampos();
        }
      }

    ]
  }

  save() {
    this.userService.saveUser(this.formGroup.value).subscribe(
      res => {
        if (res != null) {
          this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Usuario registrado con exito' });
          console.log(res);
          this.formGroup.reset();
        }
      },
      err => { }
    );
  }



  edit() {
    this.confirmationService.confirm({
      message: 'Estas seguro de eliminar al usuario ' + '?',
      header: 'Eliminar usuario',
      icon: 'pi pi-info-circle',

      accept: () => {
        //haga algo
        this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Usuario eliminado con exito' });
      },
      reject: () => {
      }
    });
  }

  olvidoContrasena(olvido:number) {
    
    this.olvido = olvido;
  }

  limpiarCampos(){
    this.formGroup.reset();
    this.formGroupLogin.reset();
    this.olvido = 0;


  }

  validarCodigo(){
    return this.validFrom;
  }


  validPassword(){
    if(this.password === this.password2){
      return true;
    }
    return false;
  }

  changePasswordRequest(){
    this.validFrom = false;
    this.userService.changePasswordRequest(this.formGroupChangePasswordRequest.value).subscribe(
      res => {
        if(res != null){
          this.messageService.add({ severity: 'info', summary: 'Código de verificación', detail: 'Se ha enviado un código de verificación a su correo electrónico :  ' });
          this.validFrom = res;
        }
      },
      err => {        
        this.messageService.add({ severity: 'success', summary: 'Error', detail: 'Se ha producido un error :  ' + err });
      }
    )
  }

  changePassword(){
    console.log(this.formGroupChangePassword.value)
    this.userService.changePassword(this.formGroupChangePassword.value).subscribe(
      res => {
        if(res == true){
          this.messageService.add({ severity: 'info', summary: 'Exito', detail: 'Su cambio fue efectivo'});
          this.validFrom = res;
          this.limpiarCampos();
        }
      },
      err => {        
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Se ha producido un error :  ' + err });
      }
    )
  }

}
