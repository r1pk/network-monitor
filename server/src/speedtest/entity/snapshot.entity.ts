import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Snapshot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  download: number;

  @Column({ nullable: true })
  upload: number;

  @Column({ nullable: true })
  ping: number;

  @Column({ nullable: true })
  loss: number;

  @Column({ nullable: true })
  host: string;

  @Column({ nullable: true })
  url: string;

  @CreateDateColumn()
  timestamp: Date;
}
