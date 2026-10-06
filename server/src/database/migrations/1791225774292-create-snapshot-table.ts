import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSnapshotTable1791225774292 implements MigrationInterface {
  name = 'CreateSnapshotTable1791225774292';

  public async up(runner: QueryRunner): Promise<void> {
    await runner.query(
      `CREATE TABLE "snapshot" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "download" float, "upload" float, "ping" float, "loss" float, "host" varchar(255), "url" varchar(2048), "timestamp" datetime NOT NULL DEFAULT (datetime('now')))`,
    );
  }

  public async down(runner: QueryRunner): Promise<void> {
    await runner.query(`DROP TABLE "snapshot"`);
  }
}
