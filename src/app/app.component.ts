/**
 * @fileoverview
 * AppComponent is the root component for the Yassir Assessment Angular application.
 * It manages the retrieval and filtering of reservations from the API, displaying them in the UI.
 */

import { Component } from '@angular/core';
import { ApiService } from './services/api.service';
import { Reservation } from './interfaces/reservations';
import { Filters } from './interfaces/filters';
import { StoreService } from './services/store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  // Properties
  title = 'yassir-assessment';
  reservations: Reservation[] = [];          // List to store all reservations
  filters: Filters = {};                      // Object to store filter criteria

  /**
   * Constructor for AppComponent.
   * @param apiServices - Instance of the ApiService for fetching reservations from the API.
   */

  constructor(private apiService: ApiService,private storeService: StoreService) {
    // Fetch reservations from the API and initialize the component
    this.apiService.getReservations().subscribe((response: Reservation[]) => {
      this.reservations = response;
      this.storeService.updateReservations(this.reservations);
    });
  }

}
