import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Query,
  Param,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import {
  CreateReservationDto,
  UpdateReservationStatusDto,
} from './dto/create-reservation.dto';

@Controller('/api/reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  // Criar nova reserva
  @Post()
  async createReservation(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationsService.createReservation(createReservationDto);
  }

  // Listar todas as reservas
  @Get()
  async getAllReservations() {
    return this.reservationsService.getAllReservations();
  }

  // Obter reserva por ID
  @Get(':reservationId')
  async getReservationById(@Param('reservationId') reservationId: string) {
    return this.reservationsService.getReservationById(reservationId);
  }

  // Obter reservas por email
  @Get('/user/:email')
  async getReservationsByEmail(@Param('email') email: string) {
    return this.reservationsService.getReservationsByEmail(email);
  }

  // Slots disponíveis
  @Get('/available/:date')
  async getAvailableSlots(@Param('date') date: string) {
    return this.reservationsService.getAvailableSlots(date);
  }

  // Atualizar status
  @Patch(':reservationId/status')
  async updateReservationStatus(
    @Param('reservationId') reservationId: string,
    @Body() updateReservationStatusDto: UpdateReservationStatusDto,
  ) {
    return this.reservationsService.updateReservationStatus(
      reservationId,
      updateReservationStatusDto,
    );
  }

  // Confirmar reserva
  @Patch(':reservationId/confirm')
  async confirmReservation(@Param('reservationId') reservationId: string) {
    return this.reservationsService.confirmReservation(reservationId);
  }

  // Cancelar reserva
  @Delete(':reservationId')
  async cancelReservation(@Param('reservationId') reservationId: string) {
    return this.reservationsService.cancelReservation(reservationId);
  }

  // Estatísticas
  @Get('/stats/summary')
  async getStats() {
    return this.reservationsService.getStats();
  }
}
