import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('flight')
export class FlightEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 10 })
  flight_code: string;

  @Column({ length: 10 })
  origin: string;

  @Column({ length: 10 })
  destination: string;

  @Column({ length: 5 })
  air_time: string;

  @Column()
  distance: number;

  @Column({ length: 50 })
  airport: string;
}
