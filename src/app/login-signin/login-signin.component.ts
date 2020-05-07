import { Component, OnInit } from '@angular/core';
import { Gender } from '../model/Gender';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, MinLengthValidator } from '@angular/forms';
import { UserService } from '../user/user.service';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-login-signin',
  templateUrl: './login-signin.component.html',
  styleUrls: ['./login-signin.component.css'],
  providers : [MessageService,ConfirmationService, UserService]
})
export class LoginSigninComponent implements OnInit {

  //FormGroup
  public formGroup: FormGroup;
  display = false;
  public formGroupLogin: FormGroup;



  

  constructor (private messageService : MessageService, private confirmationService: ConfirmationService, private formBuilder: FormBuilder, public userService : UserService, private  router : Router) { 

    this.formGroup = this.formBuilder.group(
      {
        email : new FormControl('',[Validators.required, Validators.email]),
        nombre : new FormControl('',[Validators.required]),
        password : new FormControl('',[Validators.required,Validators.minLength(8)])
      }
    );

    this.formGroupLogin = this.formBuilder.group(
      {
        email : new FormControl('',[Validators.required, Validators.email]),
        password : new FormControl('',[Validators.required,Validators.minLength(8)])
      }
    );


  }
  
  login(){
    this.userService.loginUser(this.formGroupLogin.value).subscribe(
      res => {
        if(res != null){
          this.router.navigate(["/menu"]);
          this.messageService.add({severity:'success', summary: 'Exito', detail:'Bienvenido '+ res.nombre});
          
        }
      },
      err => {
        this.messageService.add({severity:'error', summary: 'Error', detail:'Se ha producido un error :  '+ err});
      }
    );
  }

  ngOnInit(): void {
  }

  save(){
    this.userService.saveUser(this.formGroup.value).subscribe(
      res => {
        if(res != null){
          this.messageService.add({severity:'success', summary: 'Exito', detail:'Usuario registrado con exito'});
          console.log(res);
        }
      },
      err => {}
    );
  }
  
  change(){
    this.display = !this.display
  }

  edit(){
    this.confirmationService.confirm({
      message: 'Estas seguro de eliminar al usuario '+'?',
      header: 'Eliminar usuario',
      icon: 'pi pi-info-circle',
      
      accept: () => {
         //haga algo
              this.messageService.add({severity:'success', summary: 'Exito', detail:'Usuario eliminado con exito'});
          },
      reject: () => {
      }
    });
  }
}
