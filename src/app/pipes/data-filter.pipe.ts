import { Pipe, PipeTransform } from '@angular/core';
import { Reservation } from '../interfaces/reservations';

@Pipe({
  name: 'dataFilter'
})
export class DataFilterPipe implements PipeTransform {

  transform(reservations: Reservation[], customerName: string): Reservation[] {
    if(!reservations || customerName.length === 0 ){
      return reservations;
    }
    if( customerName.length === 0 ){
      return reservations;
    }

     customerName = customerName.toLowerCase();
     

    return reservations.filter(reservation =>
      reservation.customer.firstName.toLowerCase().includes(customerName) ||
      reservation.customer.lastName.toLowerCase().includes(customerName) 
    );
    
  }

}