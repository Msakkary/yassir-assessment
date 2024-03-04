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
    this.filteredReservations = this.filterReservationsByFilters(this.reservations,filters);
    console.log(this.filteredReservations)
  }


  filterReservationsByFilters(reservations: Reservation[], filters: Filters): Reservation[] {
    return reservations.filter(reservation => {
      return Object.entries(filters).every(([key, filterValues]) => {
        if (key === 'status' || key === 'shift' || key === 'area' || key === 'businessDate' || key === 'customerName') {
          if (key === 'customerName' && Array.isArray(filterValues) && filterValues.length > 0) {
            // If filtering by customerName and filterValues is a non-empty array
            const [nameFilter] = filterValues;
            const { firstName, lastName } = reservation.customer;
  
            const fullName = `${firstName} ${lastName}`;
            const fullNameLowerCase = fullName.toLowerCase();
            const nameFilterLowerCase = nameFilter.toLowerCase();
  
            return fullNameLowerCase.includes(nameFilterLowerCase);
          } else {
            // For other keys or non-array values
            const reservationValue = reservation[key as keyof Reservation];
  
            if (Array.isArray(filterValues) && filterValues.length > 0) {
              return filterValues.some(value => {
                if (Array.isArray(reservationValue)) {
                  return reservationValue.includes(value);
                } else {
                  return value === reservationValue;
                }
              });
            } else if (!Array.isArray(filterValues) && filterValues !== undefined) {
              return filterValues === reservationValue;
            }
          }
        }
  
        return true; // Ignore unknown keys in filters
      });
    });
  }
  
  

}
  
