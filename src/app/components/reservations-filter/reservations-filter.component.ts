import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Filters, Reservation } from '../../interfaces/reservations';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-reservations-filter',
  templateUrl: './reservations-filter.component.html',
  styleUrl: './reservations-filter.component.scss'
})
export class ReservationsFilterComponent {
  @Output() filtersChange = new EventEmitter(); // To emit changes

  statuses: string[] = [];
  shifts: string[] = [];
  areas: string[] = [];
  businessDates: string[] = [];

  filters: Filters = {};
  reservations: Reservation[] = [];

  constructor( apiServices: ApiService){
    apiServices.getReservations().subscribe(
      (response: Reservation[]) => {
        this.reservations = response;
        // Extract unique values for dropdowns
        this.businessDates = Array.from(new Set(this.reservations.map(item => item.businessDate)));
        this.statuses = Array.from(new Set(this.reservations.map(item => item.status)));
        this.shifts = Array.from(new Set(this.reservations.map(item => item.shift)));
        this.areas = Array.from(new Set(this.reservations.map(item => item.area)));
      }
    );
  }


  onFilterChange(event: any) {
    this.filters = this.pushValueToFilters(this.filters, event.target.id, event.target.value)
    console.log(this.filters);
    this.filtersChange.emit(this.filters);
  }


   pushValueToFilters(filters: Filters, key: string, value: string): Filters {
    // Use 'as keyof Filters' to assert that the key is a valid key of Filters
    const typedKey = key as keyof Filters;

    if (filters[typedKey]) {
      // If the key already exists, push the new value to the existing array
      filters[typedKey]?.push(value);
    } else {
      // If the key doesn't exist, create a new array with the value
      filters[typedKey] = [value];
    }

    return filters;
  }


}
