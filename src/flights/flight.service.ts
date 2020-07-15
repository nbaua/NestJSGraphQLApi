import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FlightEntity } from './flight.entity';
import { FlightInput } from './flight.input';
import e from 'express';

@Injectable()
export class FlightService {
  constructor(
    @InjectRepository(FlightEntity)
    private flightsRepository: Repository<FlightEntity>,
  ) {}

  async getFlights(): Promise<FlightEntity[]> {
    return await this.flightsRepository.find({});
  }

  async getFlightById(_id: number): Promise<FlightEntity[]> {
    return await this.flightsRepository.find({
      select: [
        'flight_code',
        'origin',
        'destination',
        'air_time',
        'distance',
        'airport',
      ],
      where: [{ id: _id }],
    });
  }

  async createFlight(flightInput: FlightInput) {
    let flight = new FlightInput();
    flight = { ...flightInput };
    try {
      return this.flightsRepository.save(flight);
    } catch (e) {
      console.log(e);
    }
  }

  async updateFlight(id: number, updatedFlight: FlightInput) {
    const existingFlight = await this.flightsRepository.findOne(id);
    if (existingFlight) {
      console.log(existingFlight);
      existingFlight.air_time = updatedFlight.air_time;
      existingFlight.airport = updatedFlight.airport;
      existingFlight.destination = updatedFlight.destination;
      existingFlight.distance = updatedFlight.distance;
      existingFlight.flight_code = updatedFlight.flight_code;
      existingFlight.origin = updatedFlight.origin;

      let result = this.flightsRepository.update(id, existingFlight);
      return existingFlight;
    }
    else
    {
      return null;
    }
  }

  async deleteFlight(id: number) {
    const existingFlight = await this.flightsRepository.findOne(id);
    if (existingFlight) {
      let result = this.flightsRepository.delete(existingFlight);
      return existingFlight;
    }
    else{
      return null;
    }
  }
}
