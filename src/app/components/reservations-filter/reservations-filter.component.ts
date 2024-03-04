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
  customerName: any;

  constructor( apiServices: ApiService){
    apiServices.getReservations().subscribe(
      (response: Reservation[]) => {
        this.reservations = response;
        // Extract unique values for dropdowns
        this.businessDates = Array.from(new Set(this.reservations.map(item => item.businessDate))).sort();
        this.statuses = Array.from(new Set(this.reservations.map(item => item.status)));
        this.shifts = Array.from(new Set(this.reservations.map(item => item.shift)));
        this.areas = Array.from(new Set(this.reservations.map(item => item.area)));
      }
    );
  }


  onFilterChange(event: any) {
    this.filters = this.pushValueToFilters(this.filters, event.target.id, event.target.value)
    this.filtersChange.emit(this.filters);
  }

  getAllValues(): string[] {
    const allValues: string[] = [];
    
    Object.values(this.filters).forEach(value => {
      if (value && (Array.isArray(value) ? value.length > 0 : value.trim() !== '')) {
        if (Array.isArray(value)) {
          allValues.push(...value.filter(val => val.trim() !== ''));
        } else {
          allValues.push(value);
        }
      }
    });
  
    return allValues;
  }

  resetFilters(): void {
    this.filters = {}; // Reset filters to an empty object or provide default values
    this.customerName = '';
    // Call any function to fetch or reload the original data
    this.filtersChange.emit(this.filters);
  }
 
  removeValueFromFilters(value: string): void {
    Object.entries(this.filters).forEach(([key, filterArray]) => {
      if (Array.isArray(filterArray) && filterArray.includes(value)) {
        this.filters[key as keyof Filters] = filterArray.filter(v => v !== value);
      }
    });
    this.filtersChange.emit(this.filters);
  }

  pushValueToFilters(filters: Filters, key: string, value: string): Filters {
    // Use 'as keyof Filters' to assert that the key is a valid key of Filters
    const typedKey = key as keyof Filters;
  
    if (filters[typedKey] && key === 'customerName') {
      // If the key is 'customerName', and the value is not already in the array, add it
      const isDuplicate = filters[typedKey]?.[0] === value;
      if (!isDuplicate) {
        filters[typedKey] = [value];
      }
    } else if (filters[typedKey] && key !== 'customerName') {
      // If the key is not 'customerName', and the value is not already in the array, add it
      if (!filters[typedKey]?.includes(value)) {
        filters[typedKey]?.push(value);
      }
    } else {
      // If the key doesn't exist, create a new array with the value
      filters[typedKey] = [value];
    }
  
    return filters;
  }
  


}
