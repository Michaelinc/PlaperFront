import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginSigninComponent } from './login-signin/login-signin.component';
import { MenuComponent } from './menu/menu.component';
import { AccountComponent } from './account/account.component';
import { SavingaccountComponent } from './account/savingaccount/savingaccount.component';
import { CreditcardComponent } from './account/creditcard/creditcard.component';
import { WalletComponent } from './account/wallet/wallet.component';
import { CheckbookComponent } from './account/checkbook/checkbook.component';


const routes: Routes = [

  {
    path : 'menu/:nombre' , component : MenuComponent, children : [
      {
        path : 'cuentas', component : AccountComponent, children : [
          {
            path : 'ahorros', component : SavingaccountComponent
          },
          {
            path : 'credito', component : CreditcardComponent
          },
          {
            path : 'billetera', component : WalletComponent
          },
          {
            path : 'chequera', component : CheckbookComponent
          }

        ]
      }

    ]
  },
  {
    path : '' , component : LoginSigninComponent, pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
