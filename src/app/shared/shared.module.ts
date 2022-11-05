import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';


// import { SchstaffstrengComponent } from './widgets/schstaffstreng/schstaffstreng.component';
import { CardComponent } from './widgets/card/card.component';
import { AppDisableDirective } from './directives/app-disable.directive';
import { MaterialModule } from '../material/material.module';
import { QueryPipe } from './pipes/query.pipe';
// import { BottomSheetComponent } from './utilities/bottom-sheet/bottom-sheet.component';
// import { SettingsPassmarkComponent } from './tables/settings-passmark/settings-passmark.component';
import { PassmarkPipe } from './pipes/passmark.pipe';


// @ts-ignore: Unreachable code error
// import {HighchartsChartModule} from 'highcharts-angular';


@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,

    CardComponent,

    AppDisableDirective,


    QueryPipe,

    // BottomSheetComponent,
    // SettingsPassmarkComponent,
    PassmarkPipe,


  ],
  imports: [
    CommonModule,
    RouterModule,
    // FlexLayoutModule,
    MaterialModule,
        // @ts-ignore: Unreachable code error

    // HighchartsChartModule,



  ],
  exports: [
    HeaderComponent,
    SidebarComponent, CardComponent,
    FooterComponent,
    AppDisableDirective, PassmarkPipe,

    // BottomSheetComponent,
    // SettingsPassmarkComponent


  ],
  // schemas: [
  //   CUSTOM_ELEMENTS_SCHEMA
  // ],
})
export class SharedModule { }
