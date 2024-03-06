import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ReservationsListComponent } from './components/reservations-list/reservations-list.component';
import { ReservationsFilterComponent } from './components/reservations-filter/reservations-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    ReservationsListComponent,
    ReservationsFilterComponent
  ],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
