/**
 * @fileoverview
 * AppComponent is the root component for the Yassir Assessment Angular application.
 * It manages the retrieval and filtering of reservations from the API, displaying them in the UI.
 */

import { Component } from '@angular/core';
import { ApiService } from './services/api.service';
import { Reservation } from './interfaces/reservations';
import { Filters } from './interfaces/filters';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  // Properties
  title = 'yassir-assessment';
  reservations: Reservation[] = [];          // List to store all reservations
  filteredReservations: Reservation[] = [];  // List to store filtered reservations
  filters: Filters = {};                      // Object to store filter criteria

  /**
   * Constructor for AppComponent.
   * @param apiServices - Instance of the ApiService for fetching reservations from the API.
   */
  constructor(apiServices: ApiService) {
    // Fetch reservations from the API and initialize the component
    apiServices.getReservations().subscribe((response: Reservation[]) => {
      this.reservations = response;
      this.filteredReservations = this.reservations;
    });
  }

  /**
   * Applies filters to the reservations list based on the specified filter criteria.
   * @param filters - Filter criteria to be applied to the reservations.
   */
  filterReservations(filters: Filters) {
    console.log(filters);
    // Update the filteredReservations list based on the filter criteria
    this.filteredReservations = this.filterReservationsByKeyword(
      this.reservations,
      filters
    );
    console.log(this.filteredReservations);
  }

  /**
   * Filters reservations based on the specified filter criteria.
   * @param reservations - List of reservations to be filtered.
   * @param filters - Filter criteria to be applied to the reservations.
   * @returns - List of reservations that match the filter criteria.
   */
  filterReservationsByKeyword(
    reservations: Reservation[],
    filters: Filters
  ): Reservation[] {
    return reservations.filter((reservation) => {
      return Object.entries(filters).every(([key, filterValues]) => {
        if (
          key === 'status' ||
          key === 'shift' ||
          key === 'area' ||
          key === 'businessDate' ||
          key === 'customerName'
        ) {
          if (
            key === 'customerName' &&
            Array.isArray(filterValues) &&
            filterValues.length > 0
          ) {
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
              return filterValues.some((value) => {
                if (Array.isArray(reservationValue)) {
                  return reservationValue.includes(value);
                } else {
                  return value === reservationValue;
                }
              });
            } else if (
              !Array.isArray(filterValues) &&
              filterValues !== undefined
            ) {
              return filterValues === reservationValue;
            }
          }
        }

        return true; // Ignore unknown keys in filters
      });
    });
  }
}
