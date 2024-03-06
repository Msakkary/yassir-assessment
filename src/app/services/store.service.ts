/**
 * @fileoverview
 * StoreService is an Angular service responsible for managing and storing
 * reservations data and filter criteria in the Yassir Assessment application.
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Filters } from '../interfaces/filters';
import { Reservation } from '../interfaces/reservations';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  // BehaviorSubjects to store reservations and filters
  private reservationsSubject = new BehaviorSubject<Reservation[]>([]);
  private filtersSubject = new BehaviorSubject<Filters>({});

  // Expose observables
  reservations$: Observable<Reservation[]> = this.reservationsSubject.asObservable();
  filters$: Observable<Filters> = this.filtersSubject.asObservable();

  /**
   * Updates the reservations data in the service.
   * @param reservations - List of reservations to update in the service.
   */
  updateReservations(reservations: Reservation[]): void {
    this.reservationsSubject.next(reservations);
  }

  /**
   * Updates the filter criteria and filtered reservations data in the service.
   * @param filters - Filter criteria to be applied.
   * @param reservationList - Original list of reservations to be filtered.
   */
  updateFilters(filters: Filters, reservationList: Reservation[]): void {
    this.filtersSubject.next(filters);

    // Apply filters to the original list of reservations
    reservationList = this.filterReservationsByKeyword(reservationList, filters);

    // Update the filtered reservations data
    this.reservationsSubject.next(reservationList);
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
