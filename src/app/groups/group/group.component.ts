import { Component, OnInit, Input } from '@angular/core';
import { Group } from 'src/app/model/Group';
import { Currency } from 'src/app/model/Currency';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { GroupserviceService } from 'src/app/Sevices/groupservice.service';
import { MessageService, SelectItem } from 'primeng/api';
import { DropdownItem, Dropdown } from 'primeng/dropdown';
import { of, Observable } from "rxjs";
import { delay } from "rxjs/operators";
import { JsonPipe } from '@angular/common';


@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  currency: SelectItem[] = [
    { label: "USD", value: "USD" },
    { label: "COP", value: "COP" },
    { label: "EUR", value: "EUR" }
  ];


  grupo: Group;
  @Input() recivedGroupEdit: Group;

  //FormGroup
  formGroup : FormGroup;
  selectedDivisa : string = 'USD' ;
  selectedNombre : string = '' ;
  enEdicion : boolean = false;
  label : string = 'Enviar';

  constructor(private messageService: MessageService, private formBuilder: FormBuilder, public groupService: GroupserviceService) { }
  ngOnInit(): void {
    console.log('init')
    this.crearFormulario();
  
  }

  verificar(){
    if (this.enEdicion == true){
      console.log('true');
      this.editData();
    }else if(this.enEdicion == false){
      console.log('false');
      this.saveData();
    }
  }

  saveData() {
    let data: Group = this.formGroup.value;
    data.emailUsuario = localStorage.getItem("email");

    this.groupService.saveGroup(data).subscribe(
      res => {
        if (res != null)
          this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Se ha creado tu grupo : ' + res.nombre });
        this.limpiarCampos();
      },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: '' + err.error.message });
      }
    );
  }

  editData() {
    let data: Group = this.formGroup.value;
    data.id = this.recivedGroupEdit.id;
    this.groupService.editGroup(data).subscribe(
      res => {
        if (res != null)
          this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Se ha actualziado tu grupo : ' + res.nombre });
        this.limpiarCampos();
      },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erro al actualizar ' + err.error.message });
      }
    );
  }

  limpiarCampos() {
    this.formGroup.reset();
    this.enEdicion = false;
    this.label = 'Enviar';
  }

  crearFormulario() {
    if (this.recivedGroupEdit != null) {
      this.selectedNombre = this.recivedGroupEdit.nombre;
      this.selectedDivisa = this.recivedGroupEdit.divisa;
      this.enEdicion = true;
      this.label = 'Actualizar';
    }
      this.formGroup = this.formBuilder.group(
        {
          nombre: new FormControl(this.selectedNombre, [Validators.required]),
          divisa: new FormControl(this.selectedDivisa,[Validators.required])
        }
      );
  }

}
