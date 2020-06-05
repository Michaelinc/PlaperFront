import { Component, OnInit } from '@angular/core';
import { Currency } from '../model/Currency';
import { Group } from '../model/Group';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { GroupserviceService } from '../Sevices/groupservice.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  currency: Currency[] = [
    { divisa: "USD"},
    { divisa: "COP"},
    { divisa: "EUR"},
  ];


  grupo: Group;

  //FormGroup
  public formGroup: FormGroup;


  constructor(private messageService : MessageService, private formBuilder: FormBuilder, public groupService: GroupserviceService) {
    this.formGroup = this.formBuilder.group(
      {
        nombre : new FormControl('',[Validators.required]),
        divisa : new FormControl(this.currency[0],[Validators.required])
      }
    );
  }
  ngOnInit(): void {
  }

  saveData(){
    let data : Group =  new Group();
    let divisa : Currency = this.formGroup.get('divisa').value;
    data.nombre = this.formGroup.get('nombre').value;
    data.divisa = divisa.divisa;
    data.emailUsuario = localStorage.getItem("email");

    this.groupService.saveGroup(data).subscribe(
      res => {
        if(res != null )
        this.messageService.add({severity:'success', summary: 'Exito', detail:'Se ha creado tu grupo '+ res.nombre});
      },
      err => {
        this.messageService.add({severity:'error', summary: 'Error', detail:'No se ha creado tu grupo '+ err});
      }
    );
  }

}
