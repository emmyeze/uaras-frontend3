import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from './shared/shared.module';
import { DefaultsidenavModule } from './layouts/defaultsidenav/defaultsidenav.module';
import { MatGridListModule } from '@angular/material/grid-list';

import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from './material/material.module';

import { UtmeComponent } from './topview/utme/utme.component';
import { DeComponent } from './topview/de/de.component';
import { PrescienceComponent } from './topview/prescience/prescience.component';
import { JupebComponent } from './topview/jupeb/jupeb.component';
import { SupComponent } from './topview/sup/sup.component';
import { FreshCandidatesComponent } from './topview/fresh-candidates/fresh-candidates.component';
import { CandidateRegistrationComponent } from './topview/candidate-registration/candidate-registration.component';
import { CandidateAdmissionComponent } from './topview/candidate-admission/candidate-admission.component';
import { SettingsComponent } from './topview/settings/settings.component';
import { DashboardComponent } from './topview/dashboard/dashboard.component';
import { HomeComponent } from './topview/home/home.component';
// import { PassmarkPipe } from './shared/pipes/passmark.pipe';
// import { PassmarkPipe } from './pipes/passmark.pipe';
// import { SettingMainComponent } from './shared/components/others/setting-main/setting-main.component';
// import { SettingsPassmarkComponent } from 'src/app/shared/tables/settings-passmark/settings-passmark.component';

@NgModule({
  declarations: [
    AppComponent,
    UtmeComponent,
    DeComponent,
    PrescienceComponent,
    JupebComponent,
    SupComponent,
    FreshCandidatesComponent,
    CandidateRegistrationComponent,
    CandidateAdmissionComponent,
    SettingsComponent,
    DashboardComponent,
    HomeComponent,
    // PassmarkPipe,
    // SettingsPassmarkComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // FullwidthModule,
    BrowserAnimationsModule,
    MatGridListModule,
    // FlexLayoutModule,
    // MatTabsModule,
    // MatIconModule,
    // MatButtonModule,
    LayoutModule,
    MaterialModule,
    SharedModule,

    // DefaultsidenavModule

  ],
  // providers: [],
  bootstrap: [AppComponent],


})
export class AppModule { }
