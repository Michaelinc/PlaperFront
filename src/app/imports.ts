
import { NgModule } from "@angular/core";

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


import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms/';


import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
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
        CommonModule


        
    ],
    exports : [
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
        CommonModule
    ]
})
export class ImportsModule {}