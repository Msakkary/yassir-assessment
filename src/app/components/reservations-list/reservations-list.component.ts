import { Component, Input } from '@angular/core';
import { Reservation } from '../../interfaces/reservations';

@Component({
  selector: 'app-reservations-list',
  templateUrl: './reservations-list.component.html',
  styleUrl: './reservations-list.component.scss',
})
export class ReservationsListComponent {
  @Input() reservationsList: Reservation[] = [];
  constructor() {}
}
