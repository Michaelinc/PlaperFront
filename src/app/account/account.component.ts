import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {


  index: number;
  items: MenuItem[];
  label: string;
  action: string;

  ngOnInit() {
    this.items = [
      {
        label: 'Registrar',
        icon: 'pi pi-fw pi-file',
        items: [{
          label: 'Nueva Cuenta',
          icon: 'pi pi-fw pi-plus',
          items: [
            {
              label: 'Cuenta de Ahorro', routerLink: ["ahorros"], command: (event) => {}
            },
            {
              label: 'Tarjeta de Crédito',routerLink: ["credito"], command: ($event) => { }
            },
            {
              label: 'Efectivo/Billetera',routerLink: ["billetera"], command: ($event) => {}
            },
            {
              label: 'Hipoteca/Prestamo', command: ($event) => {}
            },
            {
              label: 'Gasto/Ingreso', command: ($event) => {}
            },
            {
              label: 'Chequera', routerLink: ["chequera"],command: ($event) => {}
            },
            {
              label: 'Cheque', command: ($event) => {
                this.index = $event;
                this.mostrar(5)
              }
            }
          ]
        },
        {
          label: 'Nueva Grupo',
          icon: 'pi pi-fw pi-plus',
          routerLink : [""],
          command: (index) => {
          }


        }
          ,
        { label: 'Open' },
        { separator: true },
        { label: 'Cerrar' }
        ]
      },
      {
        label: 'Editar',
        icon: 'pi pi-fw pi-pencil',
        items: [
          { label: 'Delete', icon: 'pi pi-fw pi-trash' },
          { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
        ]
      },
      {
        label: 'Consultar',
        icon: 'pi pi-fw pi-search',
        items: [
          {
            label: 'Cuentas', routerLink: ["saccount"],
            command: (index) => {
              //             this.mostrar(0);
            }
          },
          {
            label: 'Patrimonio', command: ($event) => {
              this.index = $event;
              //           this.mostrar(1);
            }
          },
          {
            label: 'Saldo Tarjeta de Crédito', command: ($event) => {
              this.index = $event;
              //         this.mostrar(1);
            }
          }, {
            label: 'Saldo por Grupo', command: ($event) => {
              this.index = $event;
              //         this.mostrar(1);
            }
          }
        ]
      },
      {
        label: 'Actions',
        icon: 'pi pi-fw pi-cog',
        items: [
          {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
            items: [
              { label: 'Save', icon: 'pi pi-fw pi-save' },
              { label: 'Update', icon: 'pi pi-fw pi-save' },
            ]
          },
          {
            label: 'Other',
            icon: 'pi pi-fw pi-tags',
            items: [
              { label: 'Delete', icon: 'pi pi-fw pi-minus' }
            ]
          }
        ]
      },
      { separator: true },
      {
        label: 'Cerrar', icon: 'pi pi-fw pi-times'
      }
    ];
  }

  mostrar(n: number): void {
    this.index = n;
  }

}
