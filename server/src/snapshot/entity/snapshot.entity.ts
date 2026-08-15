import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Snapshot {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  download: number | null = null;

  @Column({ nullable: true })
  upload: number | null = null;

  @Column({ nullable: true })
  ping: number | null = null;

  @Column({ nullable: true })
  loss: number | null = null;

  @Column({ nullable: true })
  host: string | null = null;

  @Column({ nullable: true })
  url: string | null = null;

  @CreateDateColumn()
  timestamp!: Date;
}
