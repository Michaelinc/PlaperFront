import { Component, OnInit } from '@angular/core';
import { Group } from 'src/app/model/Group';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { SavingaccountserviceService } from './savingaccountservice.service';
import { SavingAccount } from 'src/app/model/SavingAccount';
import { Bank } from 'src/app/model/Bank';
import { Currency } from 'src/app/model/Currency';

@Component({
  selector: 'app-savingaccount',
  templateUrl: './savingaccount.component.html',
  styleUrls: ['./savingaccount.component.css']
})
export class SavingaccountComponent implements OnInit {
  group: Group[] = [
    { code: "0", name: "Grupo Ahorro", description: "Para ahorrar" },
    { code: "1", name: "Grupo Gasto", description: "Para gastar" },
    { code: "2", name: "Grupo mecateo", description: "Para mecatear" },
  ];

  bank: Bank[] = [
    { code: "0", name: "Bancolombia"},
    { code: "1", name: "Davivienda"},
    { code: "2", name: "Banco Agrario"},
  ];

  currency: Currency[] = [
    { code: 0, name: "USD"},
    { code: 1, name: "COP"},
    { code: 2, name: "EUR"},
  ];

  selectedGroup: Group;
  selectedBank: Bank;
  selectedCurrency : Currency;

  savingAccount: SavingAccount ;

  //FormGroup
  public formGroup: FormGroup;


  constructor(private formBuilder: FormBuilder, public savingAcountService: SavingaccountserviceService) {
    this.formGroup = this.formBuilder.group(
      {
        id : new FormControl('',[Validators.required]),
        nameAccount : new FormControl('',[Validators.required]),
        bank : new FormControl(this.bank[0],[Validators.required]),
        currency : new FormControl(this.currency[0],[Validators.required]),
        amount : new FormControl('',[Validators.required]),
        group : new FormControl(this.group[0],[Validators.required]),
        description : new FormControl('')
      }
    );
  }
  ngOnInit(): void {
  }

  saveData(){
    let data : SavingAccount = this.savingAcountService.saveSavingAccountPrueba(this.formGroup.value);
    console.log(data);
  }

}
