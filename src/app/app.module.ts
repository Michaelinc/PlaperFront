import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MenuComponent } from './menu/menu.component';
import { AccountComponent } from './account/account.component';
import { SavingaccountComponent } from './account/savingaccount/savingaccount.component';

import { TransactionComponent } from './transactions/transaction/transaction.component';

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
import {CheckboxModule} from 'primeng/checkbox';
import {TabMenuModule} from 'primeng/tabmenu';


import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms/';


import { CommonModule } from '@angular/common';
import { GroupComponent } from './groups/group/group.component';
import { ChangepasswordComponent } from './log/changepassword/changepassword.component';
import { LoginSigninComponent } from './log/login-signin/login-signin.component';
import { SavingaccounttableComponent } from './account/savingaccounttable/savingaccounttable.component';
import { GroupsComponent } from './groups/groups.component';
import { GrouptableComponent } from './groups/grouptable/grouptable.component';
import { SettingComponent } from './setting/setting.component';
import { CategoryComponent } from './setting/categories/category/category.component';
import { TagComponent } from './setting/tag/tag.component';
import { CategorytableComponent } from './setting/categories/categorytable/categorytable.component';
import { CategoriesComponent } from './setting/categories/categories.component';
import { AdjustmentComponent } from './account/adjustment/adjustment.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { TransactiontableComponent } from './transactions/transactiontable/transactiontable.component';
import { AdjustmenttableComponent } from './transactions/adjustmenttable/adjustmenttable.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    AccountComponent,
    SavingaccountComponent,
    LoginSigninComponent,
    TransactionComponent,
    GroupComponent,
    ChangepasswordComponent,
    SavingaccounttableComponent,
    GroupsComponent,
    GrouptableComponent,
    SettingComponent,
    CategoryComponent,
    TagComponent,
    CategorytableComponent,
    CategoriesComponent,
    AdjustmentComponent,
    TransactionsComponent,
    TransactiontableComponent,
    AdjustmenttableComponent
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
    ToastModule,
    CheckboxModule,
    TabMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
