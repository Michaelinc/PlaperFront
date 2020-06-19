import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/model/Transaction';
import { Transfer } from 'src/app/model/Transfer';
import { MessageService, ConfirmationService, Message, SelectItem } from 'primeng/api';
import { TransactionService } from 'src/app/Sevices/Transaction.service';
import { SavingaccountserviceService } from 'src/app/Sevices/savingaccountservice.service';
import { GenAccount } from 'src/app/model/GenAccount';
import { TransferView } from 'src/app/model/TransferView';

@Component({
  selector: 'app-transactiontable',
  templateUrl: './transactiontable.component.html',
  styleUrls: ['./transactiontable.component.css'],
  providers : [ConfirmationService,MessageService]
})
export class TransactiontableComponent implements OnInit {

  transfer : Array<Transfer>
  transferView : Array<TransferView> = [];
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
    this.transactionService.listTransfer(localStorage.getItem('email')).subscribe(
      res => {
        if (res != null) {
          this.transfer = res;
          this.transferView = res;
          this.modificarTransfer();
          console.log(this.transferView);
        }
        err => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: '' + err.error.message });
        }
      }
    );
   



    this.cols = [
      { field: 'tipo', header: 'Tipo' },
      { field: 'idCuentaOrigen', header: 'Cuenta Origen' },
      { field: 'idCuentaDestino', header: 'Cuenta Destino' },
      { field: 'cantidadEnviada', header: 'Cantidad enviada' },
      { field: 'cantidadRecibida', header: 'Cantidad recibida' }
    ];
  }

  modificarTransfer(){
      for(let t of this.transferView){
        for(let c of this.cuentas){
          if(t.idCuentaOrigen === c.id){
            t.idCuentaOrigen = c.nombre;
          }
          if(t.idCuentaDestino === c.id){
            t.idCuentaDestino = c.nombre;
          }
        }
      }
  }

  eliminarDatos(tranfer: TransferView) {
    this.confirmationService.confirm({
      message: '¿Quiere eliminar esta transferencia?',
      header: 'Confirmar borrado',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      accept: () => {
        this.msgs = [{ severity: 'info', summary: 'Confirmado', detail: 'Se ha borrado con exito' }];
        this.transactionService.removeTransaction(tranfer.id);
        this.messageService.add(this.msgs[0]);
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Cancelado', detail: 'Cancelaste la acción' }]
        this.messageService.add(this.msgs[0]);
      }
    });
  }

}
