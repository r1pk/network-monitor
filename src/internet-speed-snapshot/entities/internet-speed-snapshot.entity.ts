import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class InternetSpeedSnapshot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  download: number;

  @Column({ nullable: true })
  upload: number;

  @Column({ nullable: true })
  ping: number;

  @Column({ nullable: true })
  host: string;

  @CreateDateColumn()
  timestamp: Date;
}
