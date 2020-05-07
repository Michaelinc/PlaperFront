import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  display: any;

  items: MenuItem[];

  constructor() { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Inicio',
        icon: 'pi pi-fw pi-home'
      },
      {
        label: 'Cuentas',
        icon: 'pi pi-fw pi-pencil',
            routerLink: ['cuentas'],
            command: ( event ) => {
              this.display = false;
          }
      }
  
    ]
  }

  logout(){}
}
