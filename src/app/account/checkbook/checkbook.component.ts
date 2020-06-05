import { Component, OnInit } from '@angular/core';
import { Group } from 'src/app/model/Group';
import { Currency } from 'src/app/model/Currency';
import { Wallet } from 'src/app/model/Wallet';
import { CheckBook } from 'src/app/model/CheckBook';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-checkbook',
  templateUrl: './checkbook.component.html',
  styleUrls: ['./checkbook.component.css']
})
export class CheckbookComponent implements OnInit {
  group: Group[] = [
    { id: "0", nombre: "Grupo Ahorro", saldo : 0,divisa: "" , emailUsuario : ""},
    { id: "1", nombre: "Grupo Gasto", saldo : 0,divisa: "" , emailUsuario : ""},
    { id: "2", nombre: "Grupo mecateo", saldo : 0,divisa: "" , emailUsuario : ""},
  ];
  currency: Currency[] = [
    { divisa: "USD"},
    { divisa: "COP"},
    { divisa: "EUR"},
  ];
  selectedGroup: Group;
  selectedCurrency: Currency

  checkBook: CheckBook;

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
