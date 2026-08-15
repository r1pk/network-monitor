import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Snapshot {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'double', nullable: true })
  download: number | null = null;

  @Column({ type: 'double', nullable: true })
  upload: number | null = null;

  @Column({ type: 'double', nullable: true })
  ping: number | null = null;

  @Column({ type: 'double', nullable: true })
  loss: number | null = null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  host: string | null = null;

  @Column({ type: 'varchar', length: 2048, nullable: true })
  url: string | null = null;

  @CreateDateColumn()
  timestamp!: Date;
}
