import { Component, OnInit, Type, OnChanges, Input } from '@angular/core';
import { Group } from 'src/app/model/Group';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { SavingaccountserviceService } from '../../Sevices/savingaccountservice.service';
import { Currency } from 'src/app/model/Currency';
import { GenAccount } from 'src/app/model/GenAccount';
import { GroupserviceService } from 'src/app/Sevices/groupservice.service';
import { MessageService, SelectItem } from 'primeng/api';
import { Types } from 'src/app/model/Types';
import { range } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-savingaccount',
  templateUrl: './savingaccount.component.html',
  styleUrls: ['./savingaccount.component.css']
})
export class SavingaccountComponent implements OnInit {
  group: SelectItem[] = [];


  currency: SelectItem[] = [
    { label: "USD", value: "USD" },
    { label: "COP", value: "COP" },
    { label: "EUR", value: "EUR" }
  ];
  tipos: SelectItem[] = [
    { label: "CHEQUES", value: 'CHEQUES' },
    { label: "AHORROS", value: 'AHORROS' },
    { label: "EFECTIVO", value: 'EFECTIVO' },
    { label: "TARJETA-CREDITO", value: 'TARJETA-CREDITO' },
  ];


  savingAccount: GenAccount;

  @Input() recivedAccountEdit: GenAccount;

  cuentas: Array<GenAccount>;
  cols: any[];

  listaTipos: SelectItem[];
  listaDivisas: SelectItem[];


  saldoFilter: number;
  saldoTimeout: any;

  public formGroup: FormGroup;


  selectedGroup: string = null;
  selectedNombre: string = '';
  selectedDescripcion: string = '';
  limiteCreditoBoolean: boolean = false;
  selectedSaldoInicial: Number = 0;
  selectedDivisa: string = 'USD';
  selectedTipo: string = 'CHEQUES';
  selectedLimiteCredito: Number = 0;
  checked: boolean = false;
  checkedP: boolean = false;
  enEdicion: Boolean = false;
  label: string = 'Enviar'


  constructor(private messageService: MessageService, private formBuilder: FormBuilder, public savingAcountService: SavingaccountserviceService, public groupService: GroupserviceService) {
    console.log('contructor inicio')
    this.group.push({ label: 'Ninguno', value: null });
    groupService.listGroup(localStorage.getItem('email')).subscribe(
      res => {
        if (res != null) {
          for (let g of res) {
            this.group.push({ label: g.nombre, value: g.id });
          }
          console.log('res')
        }
        err => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al cargar grupos ' + err.error.message });
        }
      }

    );
  }

  ngOnInit(): void {
    delay(1000);
    this.crearFormulario();
  }

  saveData() {
    let data: GenAccount = this.formGroup.value;
    data.emailUsuario = localStorage.getItem("email");
    console.log(data);
    this.savingAcountService.saveSavingAccount(data).subscribe(
      res => {
        if (res != null) {
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Se ha guardado Correctamente la cuenta' });
          this.limpiarCampos();
        }
      },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al guardar ' + err.error.message });
      }
    );
  }

  editData() {
    let data: GenAccount = this.formGroup.value;
    data.saldoInicial = null;
    data.emailUsuario = null;
    data.divisa = null;
    data.saldo = null;
    data.id = this.recivedAccountEdit.id;
    console.log(data);
    this.savingAcountService.editSavingAccount(data).subscribe(
      res => {
        if (res != null) {
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Se ha actualizado Correctamente la cuenta' });
          this.limpiarCampos();
        }
      },
      err => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al actulizar ' + err.error.message });
      }
    );
  }

  limpiarCampos() {
    this.formGroup.reset();
    this.enEdicion = false;
    this.label = 'Enviar';
  }

  onSaldoChange(event, dt) {
    if (this.saldoTimeout) {
      clearTimeout(this.saldoTimeout);
    }

    this.saldoTimeout = setTimeout(() => {
      dt.filter(event.value, 'saldo', 'gt');
    }, 250);
  }


  verificarTipo() {
    console.log('verificando')
    let tipo: string = this.formGroup.get('tipo').value;
    console.log(tipo)
    if (tipo === 'TARJETA-CREDITO') {
      this.limiteCreditoBoolean = true;
      this.formGroup.addControl('limiteCredito', new FormControl('', [Validators.required]));
      console.log('finalizo')
    } else {
      this.formGroup.removeControl('limiteCredito');
      this.limiteCreditoBoolean = false;
    }
  }

  verificar() {
    if (this.enEdicion == true) {
      this.editData();
    } else if (this.enEdicion == false) {
      this.saveData();
    }
  }


  crearFormulario() {
    console.log(this.recivedAccountEdit);
    if (this.recivedAccountEdit != null) {
      this.selectedTipo = this.recivedAccountEdit.tipo;
      this.selectedDescripcion = this.recivedAccountEdit.descripcion;
      this.selectedDivisa = this.recivedAccountEdit.divisa;
      this.selectedGroup = this.recivedAccountEdit.idGrupo;
      this.selectedNombre = this.recivedAccountEdit.nombre;
      this.checkedP = this.recivedAccountEdit.adicionarPatrimonioNeto;
      this.checked = this.recivedAccountEdit.habilitarCheques;
      this.selectedSaldoInicial = this.recivedAccountEdit.saldoInicial;
      this.enEdicion = true;
      this.label = 'Actualizar'

      if (this.limiteCreditoBoolean) {
        this.selectedLimiteCredito = this.recivedAccountEdit.limiteCredito;
      }
    }

    this.formGroup = this.formBuilder.group(
      {
        nombre: new FormControl(this.selectedNombre, [Validators.required]),
        saldoInicial: new FormControl(this.selectedSaldoInicial, [Validators.required]),
        divisa: new FormControl(this.selectedDivisa, [Validators.required]),
        descripcion: new FormControl(this.selectedDescripcion),
        habilitarCheques: new FormControl(this.checked),
        adicionarPatrimonioNeto: new FormControl(this.checkedP),
        tipo: new FormControl(this.selectedTipo, [Validators.required]),
        idGrupo: new FormControl(this.selectedGroup)
      }
    );
  }
}
