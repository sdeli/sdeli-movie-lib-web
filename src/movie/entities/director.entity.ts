import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Director {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;
}
