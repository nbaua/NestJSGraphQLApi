import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlightService } from './flight.service';
import { FlightEntity } from './flight.entity';
import { FlightResolver } from './flight.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([FlightEntity])],
  providers: [FlightService, FlightResolver],
})
export class FlightsModule {}
