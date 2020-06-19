import { Component, OnInit } from '@angular/core';
import { SavingaccountserviceService } from 'src/app/Sevices/savingaccountservice.service';
import { GenAccount } from 'src/app/model/GenAccount';
import { SelectItem, MessageService } from 'primeng/api';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validarQueNoSeanIguales } from 'src/app/utli/validarQueNoSeanIguales';
import { CurrencyConverter } from 'src/app/model/CurrencyConverter';
import { TransactionService } from 'src/app/Sevices/Transaction.service';
import { Transfer } from 'src/app/model/Transfer';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  cuentas :  Array<GenAccount>;

  selectedCantidadRecibida : number = 0;
  selectedCantidadEnviada : number = 0;

  idCuentaOrigen : string = '';
  idCuentaDestino : string = '';

  listaCuentas : SelectItem[] = [];

  formGroup : FormGroup;
  
  converter = new CurrencyConverter();



  constructor(private messageService: MessageService, private transactionService: TransactionService,private savingAcountService : SavingaccountserviceService, private formBuilder : FormBuilder) { 
    this.savingAcountService.listSavingAccount(localStorage.getItem('email')).subscribe(
      res => {
        this.cuentas = res
        this.llenarCuentas();
      } 
      );
  }

  ngOnInit(): void {
        this.crearFormulario();
  }

  llenarCuentas(){
    for (let c of this.cuentas){
      this.listaCuentas.push({label : c.nombre , value : c.id });
    }
  }

  saveData(){
    let data : Transfer = this.formGroup.value
    data.tipo = "TRANSFERENCIA";

    this.transactionService.doTransaction(data).subscribe(
      res => {
        if (res != null)
          this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Se ha generado correctamente tu : ' + data.tipo });
        this.limpiarCampos();
      },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: '' + err.error.message });
      }
    );

  }

  limpiarCampos(){
    this.formGroup.reset();
  }

  crearFormulario() {
      this.formGroup = this.formBuilder.group(
        {
          idCuentaOrigen: new FormControl(this.idCuentaOrigen, [Validators.required]),
          idCuentaDestino: new FormControl(this.idCuentaDestino,[Validators.required]),
          cantidadEnviada : new FormControl(this.selectedCantidadEnviada,[Validators.required]),
          cantidadRecibida : new FormControl(this.selectedCantidadRecibida,[Validators.required]) 
        },
        {
          validators: validarQueNoSeanIguales
        }
      );
  }

  checarSiNoSonIguales(): boolean {
    return this.formGroup.hasError('SonIguales') &&
      this.formGroup.get('idCuentaOrigen').dirty &&
      this.formGroup.get('idCuentaDestino').dirty;
  }

  generarRecibida(){
    let divisa1 = this.cuentas.find(c => c.id == parseInt(this.idCuentaOrigen)).divisa;
    let divisa2 = this.cuentas.find(c => c.id == parseInt(this.idCuentaDestino)).divisa;
    this.selectedCantidadRecibida = this.converter.convert(divisa1,divisa2,this.selectedCantidadEnviada);
  }

}
