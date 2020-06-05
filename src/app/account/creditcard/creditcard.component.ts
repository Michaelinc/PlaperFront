import { Component, OnInit } from '@angular/core';
import { Group } from 'src/app/model/Group';
import { FormGroup, FormBuilder, FormControl, Validators, FormsModule } from '@angular/forms';
import { CreditCard } from 'src/app/model/CreditCard';
import { Bank } from 'src/app/model/Bank';
import { Currency } from 'src/app/model/Currency';

@Component({
  selector: 'app-creditcard',
  templateUrl: './creditcard.component.html',
  styleUrls: ['./creditcard.component.css']
})
export class CreditcardComponent implements OnInit {
  group: Group[] = [
    { id: "0", nombre: "Grupo Ahorro", saldo : 0,divisa: "" , emailUsuario : "" },
    { id: "1", nombre: "Grupo Gasto", saldo : 0,divisa: "" , emailUsuario : "" },
    { id: "2", nombre: "Grupo mecateo", saldo : 0,divisa: "" , emailUsuario : "" },
  ];
  bank: Bank[] = [
    { code: "0", name: "Bancolombia"},
    { code: "1", name: "Davivienda"},
    { code: "2", name: "Banco Agrario"},
  ];

  currency: Currency[] = [
    { divisa: "USD"},
    { divisa: "COP"},
    { divisa: "EUR"},
  ];
  
  selectedGroup: Group;
  creditCardAccount: CreditCard ;
  selectedBank: Bank;
  selectedCurrency : Currency;

  //FormGroup
  public formGroup: FormGroup;


  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group(
      {
        id : new FormControl('',[Validators.required]),
        nameAccount : new FormControl('',[Validators.required]),
        bank : new FormControl(this.bank[0],[Validators.required]),
        currency : new FormControl(this.currency[0],[Validators.required]),
        totalPasive : new FormControl('',[Validators.required]),
        limitCredit : new FormControl('',[Validators.required]),
        group : new FormControl(this.group[0],[Validators.required]),
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
