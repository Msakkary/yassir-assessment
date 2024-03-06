/**
 * @fileoverview
 * ReservationsListComponent is an Angular component responsible for displaying
 * the list of reservations in the Yassir Assessment application.
 */

import { Component, OnInit } from '@angular/core';
import { Reservation } from '../../interfaces/reservations';
import { StoreService } from '../../services/store.service';
import { Sort } from '../../util/sort';

@Component({
  selector: 'app-reservations-list',
  templateUrl: './reservations-list.component.html',
  styleUrls: ['./reservations-list.component.scss']
})
export class ReservationsListComponent implements OnInit {
  reservationsList: Reservation[] = [];
  sort = new Sort();
  sortColumn: string = "";
  sortOrder: string = "";

  /**
   * Constructor for ReservationsListComponent.
   * @param storeService - Instance of the StoreService for managing reservations data.
   */
  constructor(private storeService: StoreService) {}

  /**
   * Lifecycle hook called after the component is initialized.
   * Subscribes to changes in reservations data from the StoreService.
   */
  ngOnInit(): void {
    this.storeService.reservations$.subscribe((reservations) => {
      this.reservationsList = reservations;
      this.sortData(this.sortColumn, this.sortOrder);
    });
  }

  /**
   * Handles sorting of reservations based on the selected column and order.
   * @param column - The column by which to sort the reservations.
   * @param order - The sort order ('asc' for ascending, 'desc' for descending).
   */
  sortData(column: string, order?: string) {
    if (order) {
      // If the order argument is provided, use its value
      this.sortOrder = order;
    } else if (this.sortColumn === column) {
      // If the same column is clicked again, toggle the sort order
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      // If a new column is clicked, set the sort column and order
      this.sortColumn = column;
      this.sortOrder = 'desc';
    }

    // Sort the reservationsList based on the selected column and order
    this.reservationsList.sort(this.sort.startSort(this.sortColumn, this.sortOrder));
    this.storeService.updateReservations(this.reservationsList);
  }
}
