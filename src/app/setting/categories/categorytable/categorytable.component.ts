import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Category } from 'src/app/model/Category';
import { SelectItem, MessageService } from 'primeng/api';
import { CategoryService } from 'src/app/Sevices/category.service';

@Component({
  selector: 'app-categorytable',
  templateUrl: './categorytable.component.html',
  styleUrls: ['./categorytable.component.css']
})
export class CategorytableComponent implements OnInit {

  @Output() selectedCategory = new EventEmitter<Category>();
  listaIconos : SelectItem[];
  listaTipos : SelectItem[];
  cols: any[];
  categorias : Category[];
  constructor(private messageService: MessageService, public categoryService: CategoryService) {
    categoryService.listCategoryAdd(localStorage.getItem('email')).subscribe(
      res => {
        if (res != null) {
          this.categorias = res;
        }
        err => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: '' + err.error.message });
        }
      }
    );
  }

  ngOnInit(): void {
    this.listaIconos = [
      { label: 'TODOS', value: null },
      {label: 'automovil', value: 'automovil'},
      {label: 'compras', value: 'compras'},
      {label: 'prestamos', value: 'prestamos'},
      {label: 'vivienda', value: 'vivienda'}
    ]
    this.listaTipos = [
      { label: 'TODOS', value: null },
      {label: 'INGRESO', value: 'INGRESO'},
      {label: 'GASTO', value: 'GASTO'}
    ]
    this.cols = [
      { field: 'nombre', header: 'Nombre' },
      { field: 'tipo', header: 'Tipo' },
      { field: 'codigoIcono', header: 'Icono' }
    ];
  }

  cargarDatos(category: Category) {
    console.log('cargardatos');
    this.selectedCategory.emit(category);
  }

}
