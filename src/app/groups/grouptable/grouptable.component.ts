import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Currency } from 'src/app/model/Currency';
import { Group } from 'src/app/model/Group';
import { SelectItem, MessageService, Message } from 'primeng/api';
import { GroupserviceService } from 'src/app/Sevices/groupservice.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-grouptable',
  templateUrl: './grouptable.component.html',
  styleUrls: ['./grouptable.component.css'],
  providers : [ConfirmationService]
})
export class GrouptableComponent implements OnInit {

  @Output() selectedGroup = new EventEmitter<Group>();

  currency: Currency[] = [
    { label: "USD", value: "USD" },
    { label: "COP", value: "COP" },
    { label: "EUR", value: "EUR" }
  ];


  grupos: Array<Group>;
  cols: any[];


  listaDivisas: SelectItem[];

  saldoFilter: number = 0;
  saldoTimeout: any;
  msgs: Message[] = [];



  constructor(private confirmationService: ConfirmationService, private messageService: MessageService, public groupService: GroupserviceService) {
    groupService.listGroup(localStorage.getItem('email')).subscribe(
      res => {
        if (res != null) {
          this.grupos = res;
        }
        err => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: '' + err.error.message });
        }
      }

    );

  }

  ngOnInit(): void {

    this.listaDivisas = [
      { label: 'TODOS', value: null },
      { label: 'USD', value: 'USD' },
      { label: 'COP', value: 'COP' },
      { label: 'EUR', value: 'EUR' }
    ];

    this.cols = [
      { field: 'nombre', header: 'Nombre' },
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


  cargarDatos(group: Group) {
    console.log('cargardatos')
    this.selectedGroup.emit(group);
  }

  eliminarDatos(group: Group) {
    this.confirmationService.confirm({
      message: '¿Quiere eliminar este grupo?',
      header: 'Confirmar borrado',
      icon: 'pi pi-info-circle',
      acceptLabel : 'Si',
      rejectLabel : 'No',
      accept: () => {
        this.msgs = [{ severity: 'info', summary: 'Confirmado', detail: 'Se ha borrado con exito' }];
        this.groupService.removeGroup(group.id);
        this.messageService.add(this.msgs[0]);
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Cancelado', detail: 'Cancelaste la acción' }]
        this.messageService.add(this.msgs[0]);
      }
    });
  }


}

