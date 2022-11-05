import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import { AppRoutingModule } from 'src/app/app-routing.module';

import { DefaultsidenavComponent } from './defaultsidenav.component';


@NgModule({
  declarations: [
    DefaultsidenavComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    MatSidenavModule,

  ]
})
export class DefaultsidenavModule { }
