import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Category } from 'src/app/model/Category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  index: number;
  items: MenuItem[];
  listitems: MenuItem[];
  label: string;
  action: string;
  activeItem: MenuItem;

  sendCategory: Category;

  ngOnInit() {

    this.listitems = [
      {
        label: 'Registrar Categoria', icon: 'pi pi-fw pi-file', command: (event) => {
          this.index = 1
          this.activeItem = this.listitems[0]
          this.sendCategory = null;
        }
      },
      {
        label: 'Consultar Categoria', icon: 'pi pi-fw pi-search', command: (event) => {
          this.index = 2
          this.activeItem = this.listitems[1]
          this.sendCategory = null;
        }
      }
    ];
  }

  mostrar(n: any): void {
    console.log(n);
  }

  llenarCamposEditar(category: Category) {
    this.sendCategory = category;
    this.index = 1
    this.activeItem = this.listitems[0]
  }

}
