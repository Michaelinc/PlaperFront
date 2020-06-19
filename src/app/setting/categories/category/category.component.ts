import { Component, OnInit, Input } from '@angular/core';
import { SelectItem, MessageService } from 'primeng/api';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Category } from 'src/app/model/Category';
import { CategoryService } from 'src/app/Sevices/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  @Input() recivedCategoryEdit: Category;
  selectedIcon: string = 'automovil';
  selectedTipo: string = 'INGRESO';
  selectedNombre: string = '';
  icons : SelectItem[];
  tipo : SelectItem[];
  formGroup : FormGroup;
  categoria : Category;
  label :string = 'Enviar'

  //Variable para edicion
  enEdicion : Boolean = false;

  constructor(private messageService: MessageService,private categoryService : CategoryService,private formBuilder: FormBuilder) { 
    this.icons = [
      {label: 'automovil', value: 'automovil'},
      {label: 'compras', value: 'compras'},
      {label: 'prestamos', value: 'prestamos'},
      {label: 'vivienda', value: 'vivienda'}
    ]
    this.tipo = [
      {label: 'INGRESO', value: 'INGRESO'},
      {label: 'GASTO', value: 'GASTO'}
    ]
  }

  ngOnInit(): void {
    console.log(this.recivedCategoryEdit);
    if(this.recivedCategoryEdit != null){
      this.selectedTipo = this.recivedCategoryEdit.tipo;
      this.selectedIcon = this.recivedCategoryEdit.codigoIcono;
      this.selectedNombre = this.recivedCategoryEdit.nombre;
      this.enEdicion = true;
      this.label = 'Editar'
    }
    this.formGroup = this.formBuilder.group(
      {
        nombre: new FormControl(this.selectedNombre,[Validators.required]),
        tipo: new FormControl(this.selectedTipo,[Validators.required]),
        codigoIcono: new FormControl(this.selectedIcon,[Validators.required])
      }
    );

  }

  verificar(){
    if(this.enEdicion == true){
      this.editData();
    }else if (this.enEdicion == false){
      this.saveData();
    }
  }

  saveData( ){
    let data:Category = this.formGroup.value;
    data.emailUsuario = localStorage.getItem('email');
    this.categoryService.saveCategory(data).subscribe(
      res => {
        if (res != null)
          this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Se ha creado tu categoria : ' + res.nombre });
        this.limpiarCampos();
      },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: '' + err.error.message });
      }
    );
  }

  editData( ){
    let data:Category = this.formGroup.value;
    data.emailUsuario = localStorage.getItem('email');
    data.id = this.recivedCategoryEdit.id
    this.categoryService.editCategory(data).subscribe(
      res => {
        if (res != null)
          this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Se ha actualizado tu categoria : ' + res.nombre });
        this.limpiarCampos();
      },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: '' + err.error.message });
      }
    );
  }


  limpiarCampos() {
    this.formGroup.reset();
    this.recivedCategoryEdit = null;
    this.label = 'Enviar'
  }

}
