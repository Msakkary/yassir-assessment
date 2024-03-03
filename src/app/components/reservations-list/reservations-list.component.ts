import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Reservation } from '../../interfaces/reservations';

@Component({
  selector: 'app-reservations-list',
  templateUrl: './reservations-list.component.html',
  styleUrl: './reservations-list.component.scss'
})
export class ReservationsListComponent {
  reservations: Reservation[] = [];


  constructor(apiServices: ApiService){
    apiServices.getReservations().subscribe(
      (response: Reservation[]) => {
        this.reservations = response;
        console.log(this.reservations);
      }
    );
  }

}
