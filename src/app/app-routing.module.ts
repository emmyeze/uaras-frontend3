import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AuthGuard } from './auth.guard';
// import { DefaultComponent } from './layouts/default/default.component';
import { DefaultsidenavComponent } from './layouts/defaultsidenav/defaultsidenav.component';
// import { FullwidthComponent } from './layouts/fullwidth/fullwidth.component';
import { CandidateAdmissionComponent } from './topview/candidate-admission/candidate-admission.component';
import { CandidateRegistrationComponent } from './topview/candidate-registration/candidate-registration.component';
import { DashboardComponent } from './topview/dashboard/dashboard.component';
import { DeComponent } from './topview/de/de.component';
import { FreshCandidatesComponent } from './topview/fresh-candidates/fresh-candidates.component';
import { HomeComponent } from './topview/home/home.component';
import { JupebComponent } from './topview/jupeb/jupeb.component';
import { PrescienceComponent } from './topview/prescience/prescience.component';
import { SettingsComponent } from './topview/settings/settings.component';
import { SupComponent } from './topview/sup/sup.component';
import { UtmeComponent } from './topview/utme/utme.component';

const routes: Routes = [
//   {path: 'login',
//   component: LoginComponent
// },


  {path: 'nav',
  component: DefaultsidenavComponent,
  // canActivate: [AuthGuard],

  children: [
    {
      path: '',
      outlet: 'nav',
      component: DefaultsidenavComponent
  },
  { path: '',
  redirectTo: 'home',
  pathMatch: 'full'
},
    {path: 'home', component: HomeComponent},
    { path: 'dashboard2', component: DashboardComponent },
    { path: 'utme', component: UtmeComponent },
    { path: 'de', component: DeComponent },
    { path: 'prescience', component: PrescienceComponent },
    { path: 'jupeb', component: JupebComponent },
    { path: 'sup', component: SupComponent },
    { path: 'fresh-graduates', component: FreshCandidatesComponent },
    { path: 'candidate-admission', component: CandidateAdmissionComponent },
    { path: 'candidate-registration', component: CandidateRegistrationComponent },

  {
    path: 'settings',
    component: SettingsComponent
},
  ]


},

{ path: '',
    redirectTo: '/nav',
    pathMatch: 'full'
},




];


// const routes: Routes = [


// {path: '',
//   component: DefaultsidenavComponent,
//   children: [
//     { path: '', component: HomeComponent },
//     { path: 'dashboard2', component: DashboardComponent },
//     { path: 'staffinformation', component: StaffinformationComponent },
//     { path: 'discipline-and-queries', component: DisciplineAndQueriesComponent },
//     { path: 'leave-management', component: LeaveManagementComponent },

//   {
//     path: 'settings',
//     component: SettingsComponent
// },



//   ]

// },

// {
//   path: '', component: FullwidthComponent,
//   children: [
//     {
//       path: 'login',
//       component: LoginComponent
//     },

//   ]
// }




// ];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
