export class CreateReservationDto {
  name?: string;
  email?: string;
  phone?: string;
  date?: Date;
  time?: string;
  guests?: number;
  specialRequests?: string;
}

export class UpdateReservationStatusDto {
  status?: 'pending' | 'confirmed' | 'cancelled' | 'completed';
}
