import { Component } from '@angular/core';
import { ApiService } from './services/api.service';
import { Filters, Reservation } from './interfaces/reservations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'yassir-assessment';
  
  reservations: Reservation[] = [];
  filteredReservations: Reservation[] = [];
  filters: Filters = {};

  constructor( apiServices: ApiService){
    apiServices.getReservations().subscribe(
      (response: Reservation[]) => {
        this.reservations = response;
        this.filteredReservations = this.reservations;
        console.log(this.reservations);
      }
    );
  }

  filterReservations(filters: Filters){
    console.log(filters);
    this.filteredReservations = this.filterReservationsByFilters(this.reservations,filters)
  }

  //  filterReservationsByFilters(reservations: Reservation[], filters: Filters): Reservation[] {
  //   return reservations.filter(reservation => {
  //     return Object.entries(filters).every(([key, filterValues]) => {
  //       if (key === 'status' || key === 'shift' || key === 'area') {
  //         // Check only for allowed keys in the reservation
  //         const reservationValue = reservation[key as keyof Reservation];
          
  //         if (Array.isArray(filterValues)) {
  //           // If it's an array, check if any of the values match
  //           return filterValues.includes(reservationValue);
  //         } else {
  //           // If it's a string, check for an exact match
  //           return filterValues === reservationValue;
  //         }
  //       }
  //       return true; // Ignore unknown keys in filters
  //     });
  //   });
  // }

  filterReservationsByFilters(reservations: Reservation[], filters: Filters): Reservation[] {
    return reservations.filter(reservation => {
      return Object.entries(filters).every(([key, filterValues]) => {
        // Check only for allowed keys in the reservation
        if (key === 'status' || key === 'shift' || key === 'area' || key === 'businessDate') {
          const reservationValue = reservation[key as keyof Reservation];
  
          if (Array.isArray(filterValues)) {
            // If it's an array, check if any of the values match
            return filterValues.some(value => {
              if (Array.isArray(reservationValue)) {
                // If the reservation value is an array, check if any of its values match
                return reservationValue.includes(value);
              } else {
                // If the reservation value is a string, check for an exact match
                return value === reservationValue;
              }
            });
          } else {
            // If it's a string, check for an exact match
            return filterValues === reservationValue;
          }
        }
        return true; // Ignore unknown keys in filters
      });
    });
  }

}
  
