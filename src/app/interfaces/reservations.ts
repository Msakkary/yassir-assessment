export interface Reservation {
  id: number;
  businessDate: string;
  status: string;
  shift: string;
  start: string;
  end: string;
  quantity: number;
  customer: {
    firstName: string;
    lastName: string;
  };
  area: string;
  guestNotes: string;
}

export interface Filters {
  status?: string[];
  shift?: string[];
  area?: string[];
  businessDate?: string[];
  customerName?: string[];
}
