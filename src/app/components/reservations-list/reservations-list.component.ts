/**
 * @fileoverview
 * ReservationsListComponent is an Angular component responsible for displaying a list of reservations.
 */

import { Component, Input } from '@angular/core';
import { Reservation } from '../../interfaces/reservations';

@Component({
  selector: 'app-reservations-list',
  templateUrl: './reservations-list.component.html',
  styleUrls: ['./reservations-list.component.scss']
})
export class ReservationsListComponent {
  @Input() reservationsList: Reservation[] = []; // Input property to pass the list of reservations to the component

  /**
   * Constructor for ReservationsListComponent.
   * Initializes the component.
   */
  constructor() {}

  // Additional methods or properties can be added based on component requirements
}
