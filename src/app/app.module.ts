import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MenuComponent } from './menu/menu.component';
import { AccountComponent } from './account/account.component';
import { SavingaccountComponent } from './account/savingaccount/savingaccount.component';
import { CreditcardComponent } from './account/creditcard/creditcard.component';
import { CheckbookComponent } from './account/checkbook/checkbook.component';
import { CheckComponent } from './account/check/check.component';
import { WalletComponent } from './account/wallet/wallet.component';
import { LoginSigninComponent } from './log/login-signin/login-signin.component';
import { TransactionComponent } from './transaction/transaction.component';
import { ChangepasswordComponent } from './log/changepassword/changepassword.component';

import {SidebarModule} from 'primeng/sidebar';
import {ToolbarModule} from 'primeng/toolbar';
import {PanelMenuModule} from 'primeng/panelmenu';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ToastModule} from 'primeng/toast';
import {TableModule} from 'primeng/table';
import {MultiSelectModule} from 'primeng/multiselect';
import {DropdownModule} from 'primeng/dropdown';
import {SliderModule} from 'primeng/slider';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { FormsModule } from '@angular/forms';
import {TabViewModule} from 'primeng/tabview';
import {SlideMenuModule} from 'primeng/slidemenu';


import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms/';


import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    AccountComponent,
    SavingaccountComponent,
    CreditcardComponent,
    CheckbookComponent,
    CheckComponent,
    WalletComponent,
    LoginSigninComponent,
    TransactionComponent,
    ChangepasswordComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,

    SidebarModule,
    ToolbarModule,
    PanelMenuModule,
    MessagesModule,
    MessageModule,
    ConfirmDialogModule,
    ToastModule,
    TableModule,
    MultiSelectModule,
    DropdownModule,
    SliderModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    InputTextareaModule,
    FormsModule,
    TabViewModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    SlideMenuModule,
    ToastModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
