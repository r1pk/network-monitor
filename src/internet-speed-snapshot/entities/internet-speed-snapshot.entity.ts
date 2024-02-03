import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class InternetSpeedSnapshot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  download: number;

  @Column({ default: 0 })
  upload: number;

  @Column({ nullable: true })
  ping: number;

  @Column({ nullable: true })
  host: string;

  @CreateDateColumn()
  timestamp: Date;
}
