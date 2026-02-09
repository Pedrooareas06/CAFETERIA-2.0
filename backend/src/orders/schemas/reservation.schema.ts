import { Schema, Document } from 'mongoose';

export interface Reservation {
  _id?: string;
  reservationId: string;
  name: string;
  email: string;
  phone: string;
  date: Date;
  time: string;
  guests: number;
  specialRequests?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt?: Date;
  updatedAt?: Date;
}

export const ReservationSchema = new Schema(
  {
    reservationId: {
      type: String,
      unique: true,
      required: true,
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true }, // HH:MM format
    guests: { type: Number, required: true, min: 1, max: 20 },
    specialRequests: { type: String },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'pending',
    },
  },
  { timestamps: true },
);
