import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/model/Transaction';
import { AdjustmentView } from 'src/app/model/AdjustmentView';
import { GenAccount } from 'src/app/model/GenAccount';
import { MessageService, ConfirmationService, Message } from 'primeng/api';
import { TransactionService } from 'src/app/Sevices/Transaction.service';
import { SavingaccountserviceService } from 'src/app/Sevices/savingaccountservice.service';

@Component({
  selector: 'app-adjustmenttable',
  templateUrl: './adjustmenttable.component.html',
  styleUrls: ['./adjustmenttable.component.css'],
  providers : [ConfirmationService, MessageService]
})
export class AdjustmenttableComponent implements OnInit {

  adjust : Array<Transaction>
  adjustView : Array<AdjustmentView> = [];
  cuentas : Array<GenAccount>;
  msgs: Message[] = [];
  cols: any[];

  constructor(public savingAcountService: SavingaccountserviceService, private confirmationService: ConfirmationService, private messageService: MessageService, public transactionService: TransactionService) {

    
  }

  ngOnInit(): void {
    this.savingAcountService.listSavingAccount(localStorage.getItem('email')).subscribe(
      res => {
        this.cuentas = res
      }
    );
    this.transactionService.listAdjustment(localStorage.getItem('email')).subscribe(
      res => {
        if (res != null) {
          this.adjust = res;
          this.adjustView = res;
          this.modificarAjust();
        }
        err => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: '' + err.error.message });
        }
      }
    );
   



    this.cols = [
      { field: 'tipo', header: 'Tipo' },
      { field: 'idCuenta', header: 'Cuenta' },
      { field: 'saldoAdicional', header: 'Saldo Adicional' }
    ];
  }

  modificarAjust(){
      for(let t of this.adjustView){
        for(let c of this.cuentas){
          if(t.idCuenta === c.id){
            t.idCuenta = c.nombre;
          }
        }
      }
  }

  eliminarDatos(adjust: AdjustmentView) {
    this.confirmationService.confirm({
      message: '¿Quiere eliminar el ajuste?',
      header: 'Confirmar borrado',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      accept: () => {
        this.msgs = [{ severity: 'info', summary: 'Confirmado', detail: 'Se ha borrado con exito' }];
        this.transactionService.removeTransaction(adjust.id);
        this.messageService.add(this.msgs[0]);
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Cancelado', detail: 'Cancelaste la acción' }]
        this.messageService.add(this.msgs[0]);
      }
    });
  }

}
