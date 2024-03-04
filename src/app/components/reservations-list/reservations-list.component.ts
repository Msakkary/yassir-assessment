import { Component, Input } from '@angular/core';
import { Reservation } from '../../interfaces/reservations';

@Component({
  selector: 'app-reservations-list',
  templateUrl: './reservations-list.component.html',
  styleUrl: './reservations-list.component.scss'
})
export class ReservationsListComponent {
  @Input() reservationsList: Reservation[] = [];
  mutatedReservationList: Reservation[] = []

  customerName: string = '';

  constructor(){
    this.mutatedReservationList = this.reservationsList
  }
    
  trackById(index: number, item: Reservation): number {
    return item.id;
  }
  
 onSearchChange(event: any) {
  console.log(event.target.value)
    this.customerName = event.target.value;
  }

}
