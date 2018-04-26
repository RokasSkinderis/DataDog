import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {WelcomeComponent} from './components/welcome/welcome.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {DotaApiService} from './services/dota-api.service';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HeroesComponent} from './components/heroes/heroes.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    DashboardComponent,
    HeroesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [DotaApiService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
