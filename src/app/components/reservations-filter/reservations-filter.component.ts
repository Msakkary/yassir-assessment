/**
 * @fileoverview
 * ReservationsFilterComponent is an Angular component responsible for managing and displaying
 * filters for reservations in the Yassir Assessment application.
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Reservation } from '../../interfaces/reservations';
import { Filters } from '../../interfaces/filters';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-reservations-filter',
  templateUrl: './reservations-filter.component.html',
  styleUrls: ['./reservations-filter.component.scss'],
})
export class ReservationsFilterComponent {
  @Output() filtersChange = new EventEmitter(); // Event emitter to notify parent component about filter changes

  statuses: string[] = []; // Array to store unique reservation status values
  shifts: string[] = []; // Array to store unique reservation shift values
  areas: string[] = []; // Array to store unique reservation area values
  businessDates: string[] = []; // Array to store unique reservation business date values
  filters: Filters = {}; // Object to store filter criteria
  reservations: Reservation[] = []; // Array to store reservations data
  customerName: any; // Variable to store customer name for filtering

  /**
   * Constructor for ReservationsFilterComponent.
   * @param apiServices - Instance of the ApiService for fetching reservations from the API.
   */
  constructor(apiServices: ApiService) {
    // Fetch reservations from the API and initialize the filter dropdown values
    apiServices.getReservations().subscribe((response: Reservation[]) => {
      this.reservations = response;
      this.initializeFilterDropdowns();
    });
  }

  /**
   * Handles the change event of filter dropdowns.
   * @param event - Event object containing information about the change in the dropdown.
   */
  onFilterChange(event: any) {
    const selectedValue = event.target.value;
    const selectedId = event.target.id;

    // Update the filters object with the selected filter criteria
    this.filters = this.pushValueToFilters(this.filters, selectedId, selectedValue);

    // Emit the updated filters to the parent component
    this.filtersChange.emit(this.filters);

    // Update the selected value in the dropdown to the first option
    if (selectedId !== 'customerName') {
      const dropdownElement = document.getElementById(
        selectedId
      ) as HTMLSelectElement;
      if (dropdownElement && dropdownElement.options.length > 0) {
        dropdownElement.value = dropdownElement.options[0].value;
      }
    }
  }

  /**
   * Retrieves all values from the filters object.
   * @returns - Array of all values from the filters object.
   */
  getAllValues(): string[] {
    const allValues: string[] = [];

    Object.values(this.filters).forEach((value) => {
      if (
        value &&
        (Array.isArray(value) ? value.length > 0 : value.trim() !== '')
      ) {
        if (Array.isArray(value)) {
          allValues.push(...value.filter((val) => val.trim() !== ''));
        } else {
          allValues.push(value);
        }
      }
    });
    return allValues;
  }

  /**
   * Resets all filters to their default values.
   */
  resetFilters(): void {
    this.filters = {}; // Reset filters to an empty object or provide default values
    this.customerName = '';
    // Emit the updated filters to the parent component
    this.filtersChange.emit(this.filters);
  }

  /**
   * Clears the search input field and the corresponding filter in the Filters object.
   */
  clearSearch(): void {
    if (this.customerName) {
      // Clear the search input field
      this.customerName = '';
  
      // Clear the customerName filter in the Filters object
      this.filters.customerName = [];
      
      // Emit the updated filters to the parent component
      this.filtersChange.emit(this.filters);
    }
  }

  /**
   * Removes a specific value from the filters object.
   * @param value - The value to be removed from the filters object.
   */
  removeValueFromFilters(value: string): void {
    Object.entries(this.filters).forEach(([key, filterArray]) => {
      if (Array.isArray(filterArray) && filterArray.includes(value)) {
        this.filters[key as keyof Filters] = filterArray.filter((v) => v !== value);
  
        // Check if the removed value is from the search input field
        if (key === 'customerName') {
          this.clearSearch(); // Clear the search input field
        }
      }
    });
    // Emit the updated filters to the parent component
    this.filtersChange.emit(this.filters);
  }

  /**
   * Adds a value to the filters object.
   * @param filters - The filters object to be updated.
   * @param key - The key of the filter to be updated.
   * @param value - The value to be added to the filter.
   * @returns - The updated filters object.
   */
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

  /**
   * Initializes the values of the filter dropdowns based on the fetched reservations data.
   */
  private initializeFilterDropdowns(): void {
    this.businessDates = Array.from(
      new Set(this.reservations.map((item) => item.businessDate))
    ).sort();
    this.statuses = Array.from(
      new Set(this.reservations.map((item) => item.status))
    );
    this.shifts = Array.from(
      new Set(this.reservations.map((item) => item.shift))
    );
    this.areas = Array.from(
      new Set(this.reservations.map((item) => item.area))
    );
  }
}
