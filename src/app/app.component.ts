import { Component } from '@angular/core';
import { ApiService } from './services/api.service';
import { Reservation } from './interfaces/reservations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'yassir-assessment';
  reservations: Reservation[] = [];

  constructor( apiServices: ApiService){

  }
}
