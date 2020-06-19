import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  index: number;
  listitems: MenuItem[];
  activeItem: MenuItem;

  constructor() { }

  ngOnInit(): void {
    this.listitems = [
      {
        label: 'Registrar Transferencia', icon: 'pi pi-fw pi-file', command: (event) => {
          this.index = 1
          this.activeItem = this.listitems[0]
        }
      },
      {
        label: 'Consultar Transferencias', icon: 'pi pi-fw pi-search', command: (event) => {
          this.index = 2
          this.activeItem = this.listitems[1]
        }
      },
      {
        label: 'Consultar Ajustes', icon: 'pi pi-fw pi-search', command: (event) => {
          this.index = 3
          this.activeItem = this.listitems[2]
        }
      }
    ];
  }

}
