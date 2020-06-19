import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';
import { FormGroup } from '@angular/forms';
import { GenAccount } from '../model/GenAccount';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {


  index: number;
  items: MenuItem[];
  listitems: MenuItem[];
  label: string;
  action: string;
  activeItem: MenuItem;

  sendAccount : GenAccount;

  sendAccountAdjustment : GenAccount;


  ngOnInit() {

    this.listitems = [
      {label: 'Registrar Cuenta', icon: 'pi pi-fw pi-file' , disabled : this.comprobar(), command: (event) => {

          this.index = 1
          this.activeItem = this.listitems[0]
          this.sendAccount = null;
        

      }},
      {label: 'Consultar Cuentas', icon: 'pi pi-fw pi-search', disabled : this.comprobar(), command: (event) => {
          this.index = 2
          this.activeItem = this.listitems[1]
          this.sendAccount = null;

      }},
      {label: 'Ajustar Saldo', icon: 'pi pi-fw pi-cog', disabled : this.comprobar(), command: (event) => {
        if(this.index === 3){
          this.index = 3
          this.activeItem = this.listitems[2]
          this.sendAccount = null;
        }

      }}
  ];
  }
  comprobar(): boolean{
    if(this.index == 3){
      return true;
    }else{
      return false;
    }
   
  }

  mostrar(n: any): void {
    console.log(n);
  }

  llenarCamposEditar(account : GenAccount){
    this.sendAccount = account;
    this.index = 1
    this.activeItem = this.listitems[0]
  }

  generarCambio(n : number){
    this.index = n
    this.activeItem = this.listitems[n-1]
  }

  llenarCamposAdjuste(account : GenAccount){
    this.sendAccountAdjustment = account;
    this.index = 3
    this.activeItem = this.listitems[2]
  }

}
