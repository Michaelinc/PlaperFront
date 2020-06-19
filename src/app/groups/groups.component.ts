import { Component, OnInit } from '@angular/core';
import { Group } from '../model/Group';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  index: number;
  listitems: MenuItem[];
  label: string;
  action: string;
  activeItem: MenuItem;

  sendGroup: Group;

  ngOnInit() {

    this.listitems = [
      {
        label: 'Registrar Grupo', icon: 'pi pi-fw pi-file', command: (event) => {
          this.index = 1
          this.activeItem = this.listitems[0]
          this.sendGroup = null;
        }
      },
      {
        label: 'Consultar Grupos', icon: 'pi pi-fw pi-search', command: (event) => {
          this.index = 2
          this.activeItem = this.listitems[1]
          this.sendGroup = null;
        }
      }
    ];
  }

  mostrar(n: any): void {
    console.log(n);
  }

  llenarCamposEditar(group: Group) {
    this.sendGroup = group;
    this.index = 1
    this.activeItem = this.listitems[0]
  }

}
