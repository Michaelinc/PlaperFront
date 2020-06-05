import { Component, OnInit } from '@angular/core';
import { Group } from 'src/app/model/Group';
import { Wallet } from 'src/app/model/Wallet';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Currency } from 'src/app/model/Currency';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  group: Group[] = [
    { id: "0", nombre: "Grupo Ahorro", saldo : 0,divisa: "" , emailUsuario : ""},
    { id: "1", nombre: "Grupo Gasto", saldo : 0,divisa: "" , emailUsuario : ""},
    { id: "2", nombre: "Grupo mecateo", saldo : 0,divisa: "" , emailUsuario : "" },
  ];
  currency: Currency[] = [
    { divisa: "USD"},
    { divisa: "COP"},
    { divisa: "EUR"},
  ];
  selectedGroup: Group;
  selectedCurrency: Currency
  wallet: Wallet  ;

  //FormGroup
  public formGroup: FormGroup;


  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group(
      {
        id : new FormControl('',[Validators.required]),
        nameAccount : new FormControl('',[Validators.required]),
        amount : new FormControl('',[Validators.required]),
        group : new FormControl(this.group[0],[Validators.required]),
        currency : new FormControl(this.currency[0],[Validators.required]),
        description : new FormControl('')
      }
    );
  }
  ngOnInit(): void {
  }

  saveData(){
    console.log(this.formGroup.value);
  }
}
