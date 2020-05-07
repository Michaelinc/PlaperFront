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
    { code: "0", name: "Grupo Ahorro", description: "Para ahorrar" },
    { code: "1", name: "Grupo Gasto", description: "Para gastar" },
    { code: "2", name: "Grupo mecateo", description: "Para mecatear" },
  ];
  currency: Currency[] = [
    { code: 0, name: "USD"},
    { code: 1, name: "COP"},
    { code: 2, name: "EUR"},
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
