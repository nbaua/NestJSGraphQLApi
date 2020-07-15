import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { FlightEntity } from './flight.entity';
import { FlightService } from './flight.service';
import { FlightInput } from './flight.input';

@Resolver(of => FlightEntity)
export class FlightResolver {
  constructor(private readonly flightService: FlightService) {}

  @Query(() => [FlightEntity])
  async flights() {
    return this.flightService.getFlights();
  }

  
  @Query(() => FlightEntity)
  async flight(@Args('id') id:number) {
    return this.flightService.getFlightById(id);
  }

  @Mutation(() => FlightEntity)
  async createFlight(@Args('input') input: FlightInput) {
    return await this.flightService.createFlight(input);
  }

  @Mutation(() => FlightEntity)
  async updateFlight(@Args('id') id:number, @Args('input') input: FlightInput) {
    return await this.flightService.updateFlight(id, input);
  }

  @Mutation(() => FlightEntity)
  async deleteFlight(@Args('id') id:number) {
    return await this.flightService.deleteFlight(id);
  }
}
