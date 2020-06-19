import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginSigninComponent } from './log/login-signin/login-signin.component';
import { MenuComponent } from './menu/menu.component';
import { AccountComponent } from './account/account.component';
import { ChangepasswordComponent } from './log/changepassword/changepassword.component';
import { GroupsComponent } from './groups/groups.component';
import { SettingComponent } from './setting/setting.component';
import { TransactionComponent } from './transactions/transaction/transaction.component';
import { TransactionsComponent } from './transactions/transactions.component';


const routes: Routes = [

 {
    path : 'recuperarcontraseña' , component : ChangepasswordComponent
  },
  {
    path : '' , redirectTo : 'plaper.com', pathMatch: "full"
  },
  {
    path : 'plaper.com/menu/:nombre' , component : MenuComponent, children : [
      {
        path : 'cuentas', component : AccountComponent
      },
      {
        path : 'grupos', component : GroupsComponent
      },
      {
        path : 'transacciones', component : TransactionsComponent
      },
      {
        path : 'ajustes', component : SettingComponent
      }
    ]
  },
  {
    path : 'plaper.com' , component : LoginSigninComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
