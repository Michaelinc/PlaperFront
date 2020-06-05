import { Component, OnInit, Type } from '@angular/core';
import { Group } from 'src/app/model/Group';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { SavingaccountserviceService } from '../../Sevices/savingaccountservice.service';
import { Currency } from 'src/app/model/Currency';
import { GenAccount } from 'src/app/model/GenAccount';
import { GroupserviceService } from 'src/app/Sevices/groupservice.service';
import { MessageService } from 'primeng/api';
import { Types } from 'src/app/model/Types';

@Component({
  selector: 'app-savingaccount',
  templateUrl: './savingaccount.component.html',
  styleUrls: ['./savingaccount.component.css']
})
export class SavingaccountComponent implements OnInit {
  group: Group[];

  currency: Currency[] = [
    { divisa: "USD"},
    { divisa: "COP"},
    { divisa: "EUR"},
  ];
  tipos: Types[] = [
    { tipo: "CHEQUES"},
    { tipo: "AHORROS"},
    { tipo: "EFECTIVO"},
    { tipo: "TARJETA-CREDITO"},
  ];

  selectedGroup: Group;
  selectedCurrency : Currency;
  checked: boolean = false;
  checkedP: boolean = false;
  savingAccount: GenAccount ;

  //FormGroup
  public formGroup: FormGroup;


  constructor(private messageService : MessageService, private formBuilder: FormBuilder, public savingAcountService: SavingaccountserviceService, public groupService : GroupserviceService) {
    groupService.listGroup(localStorage.getItem('email')).subscribe(
      res => {
        if(res != null){
          this.group = res;
        }
        err => {
          this.messageService.add({severity:'error', summary: 'Error', detail:'Error al cargar grupos '+ err});
        }
      }
      );

    this.formGroup = this.formBuilder.group(
      {
        nombre : new FormControl('',[Validators.required]),
        saldoInicial : new FormControl('',[Validators.required]),
        divisa : new FormControl(this.currency,[Validators.required]),
        descripcion : new FormControl(''),
        habilitarCheques : new FormControl(this.checked),
        adicionarPatrimonioNeto : new FormControl(this.checkedP),
        tipo : new FormControl(this.tipos[0],[Validators.required]),
        idGrupo : new FormControl(this.group,[Validators.required]),
        limiteCredito : new FormControl('',[Validators.required]),
      }
    );
  }
  ngOnInit(): void {
  }

  saveData(){
    let data : GenAccount =  new GenAccount();
    let idGrupo : Group = this.formGroup.get('idGrupo').value;
    let divisa : Currency = this.formGroup.get('divisa').value;
    let tipo : Types = this.formGroup.get('tipo').value;
    data.nombre = this.formGroup.get('nombre').value;
    data.saldoInicial = this.formGroup.get('saldoInicial').value;
    data.divisa = divisa.divisa;
    data.descripcion = this.formGroup.get('descripcion').value;
    data.habilitarCheques = this.formGroup.get('habilitarCheques').value;
    data.adicionarPatrimonioNeto = this.formGroup.get('adicionarPatrimonioNeto').value;
    data.tipo = tipo.tipo;
    data.idGrupo = idGrupo.id;
    data.emailUsuario = localStorage.getItem("email");

    console.log(data);

    this.savingAcountService.saveSavingAccount(data).subscribe(
      res => {
        if(res != null){
          this.messageService.add({severity:'success', summary: 'Éxito', detail:'Se ha guardado Correctamente la cuenta'});
          this.limpiarCampos();
        }
      },
      err => {
        this.messageService.add({severity:'error', summary: 'Error', detail:'Error al guardar '+ err.error});
      }
    );
  }
limpiarCampos(){
  this.formGroup.reset();
}
isDisabled :boolean =  false/*(){
  let tipo : Types = this.formGroup.get('tipo').value;
  if(tipo.tipo =  "TARJETA-CREDITO"){
    return true
  }
  return false
}*/
}
