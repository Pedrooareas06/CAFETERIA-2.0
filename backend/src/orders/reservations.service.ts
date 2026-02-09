import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import {
  CreateReservationDto,
  UpdateReservationStatusDto,
} from './dto/create-reservation.dto';
import { Reservation } from './schemas/reservation.schema';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectModel('Reservation')
    private reservationModel: Model<Reservation & Document>,
  ) {}

  // Criar nova reserva
  async createReservation(
    createReservationDto: CreateReservationDto,
  ): Promise<any> {
    const reservationId = `RES-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    const reservation = await this.reservationModel.create({
      ...createReservationDto,
      reservationId,
      status: 'pending',
    });

    return reservation;
  }

  // Listar todas as reservas
  async getAllReservations(): Promise<any[]> {
    return this.reservationModel
      .find()
      .sort({ date: 1, time: 1 })
      .exec();
  }

  // Obter reserva por ID
  async getReservationById(reservationId: string): Promise<any> {
    return this.reservationModel.findOne({ reservationId }).exec();
  }

  // Obter reservas por email
  async getReservationsByEmail(email: string): Promise<any[]> {
    return this.reservationModel
      .find({ email })
      .sort({ date: -1 })
      .exec();
  }

  // Atualizar status da reserva
  async updateReservationStatus(
    reservationId: string,
    updateReservationStatusDto: UpdateReservationStatusDto,
  ): Promise<any> {
    return this.reservationModel
      .findOneAndUpdate({ reservationId }, updateReservationStatusDto, {
        new: true,
      })
      .exec();
  }

  // Cancelar reserva
  async cancelReservation(reservationId: string): Promise<any> {
    return this.reservationModel
      .findOneAndUpdate({ reservationId }, { status: 'cancelled' }, { new: true })
      .exec();
  }

  // Confirmar reserva
  async confirmReservation(reservationId: string): Promise<any> {
    return this.reservationModel
      .findOneAndUpdate(
        { reservationId },
        { status: 'confirmed' },
        { new: true },
      )
      .exec();
  }

  // Obter reservas disponíveis para uma data/hora
  async getAvailableSlots(date: string, duration: number = 2) {
    const baseSlots = [
      '11:30',
      '12:00',
      '12:30',
      '13:00',
      '13:30',
      '14:00',
      '18:00',
      '18:30',
      '19:00',
      '19:30',
      '20:00',
    ];

    const queryDate = new Date(date);
    queryDate.setHours(0, 0, 0, 0);

    const nextDate = new Date(queryDate);
    nextDate.setDate(nextDate.getDate() + 1);

    const reservations = await this.reservationModel
      .find({
        date: {
          $gte: queryDate,
          $lt: nextDate,
        },
        status: { $in: ['pending', 'confirmed'] },
      })
      .exec();

    const bookedSlots = reservations.map((r: any) => r.time);
    const availableSlots = baseSlots.filter((slot) => !bookedSlots.includes(slot));

    return availableSlots;
  }

  // Estatísticas
  async getStats() {
    const totalReservations = await this.reservationModel.countDocuments();
    const confirmedReservations = await this.reservationModel.countDocuments({
      status: 'confirmed',
    });
    const totalGuests = await this.reservationModel.aggregate([
      { $group: { _id: null, total: { $sum: '$guests' } } },
    ]);

    return {
      totalReservations,
      confirmedReservations,
      totalGuests: totalGuests[0]?.total || 0,
    };
  }
}
