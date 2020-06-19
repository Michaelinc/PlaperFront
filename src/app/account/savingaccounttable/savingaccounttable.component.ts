import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SavingaccountserviceService } from 'src/app/Sevices/savingaccountservice.service';
import { GroupserviceService } from 'src/app/Sevices/groupservice.service';
import { GenAccount } from 'src/app/model/GenAccount';
import { SelectItem } from 'primeng/api/selectitem';
import { Types } from 'src/app/model/Types';
import { Currency } from 'src/app/model/Currency';
import { Group } from 'src/app/model/Group';
import { MessageService } from 'primeng/api';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-savingaccounttable',
  templateUrl: './savingaccounttable.component.html',
  styleUrls: ['./savingaccounttable.component.css']
})
export class SavingaccounttableComponent implements OnInit {

  group: Group[];

  @Output() selectedAccount = new EventEmitter<GenAccount>();

  @Output() selectedAccountAdjustment = new EventEmitter<GenAccount>();

  currency: Currency[] = [
    { label: "USD", value : "USD" },
    { label: "COP", value : "COP" },
    { label: "EUR", value : "EUR"}
  ];
  tipos: Types[] = [
    { tipo: "CHEQUES"},
    { tipo: "AHORROS"},
    { tipo: "EFECTIVO"},
    { tipo: "TARJETA-CREDITO"},
  ];


  cuentas :  Array<GenAccount>;
  cols : any[];

  listaTipos : SelectItem[];
  listaDivisas : SelectItem[];
  mapGrupo  : SelectItem[] = new Array();
  

  saldoFilter: number;
  saldoTimeout: any;



  constructor(private messageService : MessageService, public savingAcountService: SavingaccountserviceService, public groupService : GroupserviceService) {
    groupService.listGroup(localStorage.getItem('email')).subscribe(
      res => {
        if(res != null){
          this.group = res;
          console.log(res);
          this.llenarMap();
        }
        err => {
          this.messageService.add({severity:'error', summary: 'Error', detail: '' + err.error.message });
        }
      }

      );

  }

  ngOnInit(): void {
    this.savingAcountService.listSavingAccount(localStorage.getItem('email')).subscribe(
      res => {
        this.cuentas = res
        console.log(res); 
        this.modificarCuentas();
      } 
      );

      this.listaTipos = [
            { label: 'TODOS', value: null },
            { label: 'AHORROS', value: 'AHORROS' },
            { label: 'CHEQUE', value: 'CHEQUE' },
            { label: 'EFECTIVO', value: 'EFECTIVO' },
            { label: 'TARJETA-CREDITO', value: 'CREDITO' }
        ];

        this.listaDivisas = [
            { label: 'TODOS', value: null },
            { label: 'USD', value: 'USD' },
            { label: 'COP', value: 'COP' },
            { label: 'EUR', value: 'EUR' }
        ];

        this.cols = [
            { field: 'nombre', header: 'Nombre' },
            { field: 'tipo', header: 'Tipo' },
            { field: 'idGrupo', header: 'Grupo' },
            { field: 'divisa', header: 'Divisa' },  
            { field: 'saldo', header: 'Saldo' }
        ];
  }


onSaldoChange(event, dt) {
  if (this.saldoTimeout) {
      clearTimeout(this.saldoTimeout);
  }

  this.saldoTimeout = setTimeout(() => {
      dt.filter(event.value, 'saldo', 'gt');
  }, 250);
}

modificarCuentas(){
  for (let c of this.cuentas){
    for(let g of this.mapGrupo){
      if(c.idGrupo ==  g.value){
        c.idGrupo = g.label
      }
    }
  }
  console.log(this.cuentas);
}
llenarMap(){
  this.mapGrupo.push({label : 'Ninguno', value : 'Ninguno'});
  for (let g of this.group){
    this.mapGrupo.push({label : g.nombre, value : g.id});
  }
}

cargarDatos(account : GenAccount){
  account.idGrupo = this.mapGrupo.find(element => element.label === account.idGrupo).value;
  this.selectedAccount.emit(account);
}

ajustarDatos(account : GenAccount){
  this.selectedAccountAdjustment.emit(account);
}

}
