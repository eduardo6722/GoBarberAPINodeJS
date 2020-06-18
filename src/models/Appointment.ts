import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './User';

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  // eslint-disable-next-line camelcase
  provider_id: string;

  @Column('timestamp with time zone')
  date: Date;

  @ManyToOne(() => User, user => user.appointment)
  @JoinColumn({ name: 'provider_id' })
  provider: User;

  @CreateDateColumn()
  // eslint-disable-next-line camelcase
  created_at: Date;

  @UpdateDateColumn()
  // eslint-disable-next-line camelcase
  updated_at: Date;
}
