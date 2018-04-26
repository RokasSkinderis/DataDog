import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WelcomeComponent} from "./components/welcome/welcome.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {HeroesComponent} from "./components/heroes/heroes.component";

const routes: Routes = [
  {path: 'Welcome', component: WelcomeComponent},
  {path: 'Dashboard', component: DashboardComponent},
  {path: 'Dashboard/heroes', component: HeroesComponent},
  {path: '', redirectTo: '/Welcome', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
