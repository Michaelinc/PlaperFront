import { Component, OnInit, ɵɵtextInterpolate8 } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';
import { MessageService } from 'primeng/api';
import { User } from '../model/User';
import { UserService } from '../Sevices/user.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [MessageService, UserService]
})
export class MenuComponent implements OnInit {

  display: any;

  items: MenuItem[];

  constructor(private messageService: MessageService, private userService: UserService, private _route: ActivatedRoute, private router: Router) {
    let email = localStorage.getItem("email");
    if (email != null) {
      this.userService.verifySesionUser(email).subscribe(
        res => {
          if (res == false) {
            this.router.navigate(['']);
          }
          this.messageService.add({ severity: 'success', summary: 'Sesión Iniciada', detail: 'Bienvenid@ ' + localStorage.getItem("nombre") });
        },
        err => {
          this.messageService.add({ severity: 'Autenticacion', summary: 'Error', detail: '' + err });
        }
      )

    }
    else {
      this.router.navigate(['plaper.com'])
      this.messageService.add({ severity: 'Autenticacion', summary: 'No ha inicado sesión', detail: 'Error en la Autentacion' });
    }

  }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Inicio',
        icon: 'pi pi-fw pi-home',
        command: (event) => {
          this.display = false;
          this.router.navigate(['plaper.com/menu/' + localStorage.getItem("nombre")]);
        }
      },
      {
        label : "Nuevo",
        icon: 'pi pi-fw pi-plus',
        command: (event) => {
        },
        items : [
          {
            label: 'Grupo',
            icon: 'pi pi-fw pi-pencil',
            routerLink: ['grupos'],
            command: (event) => {
              this.display = false;
            }
          },
          {
            label: 'Cuenta',
            icon: 'pi pi-fw pi-pencil',
            routerLink: ['cuentas'],
            command: (event) => {
              this.display = false;
            }
          }
        ]
      },
      {
        label: 'Transacciones',
        icon: 'pi pi-fw pi-plus',
        routerLink : ['transacciones'],
        command: (event) => {
          this.display = false;
          //this.router.navigate(['plaper.com/menu/' + localStorage.getItem("nombre")+'/ajustes']);
        }
      },
      {
        label: 'Ajustes',
        icon: 'pi pi-fw pi-th-large',
        routerLink : ['ajustes'],
        command: (event) => {
          this.display = false;
          //this.router.navigate(['plaper.com/menu/' + localStorage.getItem("nombre")+'/ajustes']);
        }
      }
    ];
    this.messageService.add({ severity: 'success', summary: 'Sesión Iniciada', detail: 'Bienvenid@ ' + localStorage.getItem("nombre") });

  }

  logout() {
    let user = new User();
    user.email = localStorage.getItem('email');
    console.log(user);
    this.userService.logoutUser(user).subscribe(
      res => {
        let nombre = this._route.snapshot.paramMap.get('nombre');
        this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Se a cerrado tu cuenta ' + nombre });
        localStorage.removeItem('email');
        localStorage.removeItem('nombre');
        this.router.navigate(['']);
      },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Se ha producido un error :  ' + err });
      }
    );
  }
}
