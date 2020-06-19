import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  items: MenuItem[];

  display = true;
  
  index:number = 0;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Categorias',
        icon: 'pi pi-fw pi-home',
        command: (event) => {
          this.index = 1
        }
      }
    ];
  }

}
