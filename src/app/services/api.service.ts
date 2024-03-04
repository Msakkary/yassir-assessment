import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reservation } from '../interfaces/reservations';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  reservations: Reservation[] = [];

  constructor(private http: HttpClient) {
    this.getReservations();
  }

  getReservations(){
    return this.http.get<Reservation[]>('http://localhost:3000/reservations');
  }
}