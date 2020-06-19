import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GenAccount } from 'src/app/model/GenAccount';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { SelectItem, MessageService } from 'primeng/api';
import { TransactionService } from 'src/app/Sevices/Transaction.service';
import { Transaction } from 'src/app/model/Transaction';
import { Adjustment } from 'src/app/model/Adjustment';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-adjustment',
  templateUrl: './adjustment.component.html',
  styleUrls: ['./adjustment.component.css']
})
export class AdjustmentComponent implements OnInit {

  @Input() recivedAccountAdjustment: GenAccount = null;

  @Output() emitChange = new EventEmitter<number>();

  selectedAccount: string = '';
  selectedSaldo: number = 0;

  //FormGroup
  formGroup: FormGroup;
  account: SelectItem[] = [];


  constructor(private messageService: MessageService, private formBuilder: FormBuilder, public transactionService: TransactionService) {}
  ngOnInit(): void {
    console.log('init')
    this.crearFormulario();
  }

  saveData() {
    let data: Adjustment = new Adjustment();
    data.idCuenta = this.recivedAccountAdjustment.id;
    data.saldoAdicional = this.selectedSaldo;
    data.tipo = "AJUSTE";

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

  limpiarCampos() {
    this.formGroup.reset();
    delay(5000)
    this.emitChange.emit(1);

  }

  crearFormulario() {
    if (this.recivedAccountAdjustment != null) {
      this.selectedAccount = this.recivedAccountAdjustment.nombre;
      this.selectedSaldo = this.recivedAccountAdjustment.saldo;
      this.account.push({label : this.recivedAccountAdjustment.nombre , value : this.recivedAccountAdjustment.id});

    }
    console.log('crear')
    this.formGroup = this.formBuilder.group(
      {
        id: new FormControl(this.selectedAccount, [Validators.required]),
        saldo: new FormControl(this.selectedSaldo, [Validators.required])
      }
    );
  }

}
