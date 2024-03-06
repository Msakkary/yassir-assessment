/**
 * @fileoverview
 * ApiService is an Angular service responsible for handling HTTP requests
 * related to reservations in the Yassir Assessment application.
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reservation } from '../interfaces/reservations';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  reservations: Reservation[] = []; // Property to store reservations data

  /**
   * Constructor for ApiService.
   * @param http - Angular's HttpClient for making HTTP requests.
   */
  constructor(private http: HttpClient) {
    // Initialize the service by fetching reservations data from the API
    this.getReservations();
  }

  /**
   * Fetches reservations data from the API.
   * @returns - Observable containing the list of reservations.
   */
  getReservations() {
    // Make an HTTP GET request to the reservations API endpoint
    return this.http.get<Reservation[]>('http://localhost:3000/reservations');
  }
}
