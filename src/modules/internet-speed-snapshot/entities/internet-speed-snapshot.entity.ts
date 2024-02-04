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
  latency: number;

  @Column({ nullable: true })
  jitter: number;

  @Column({ nullable: true })
  loss: string;

  @Column({ nullable: true })
  host: string;

  @Column({ nullable: true })
  url: string;

  @CreateDateColumn()
  timestamp: Date;
}
