import { MigrationInterface, QueryRunner } from 'typeorm';

export class ModifyBookTable1719083426644 implements MigrationInterface {
  name = 'ModifyBookTable1719083426644';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "book" ADD "title" character varying NOT NULL default ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "book" ADD "available_copies" integer NOT NULL default 0`,
    );
    await queryRunner.query(
      `ALTER TABLE "book" ADD "language" character varying NOT NULL default ''`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "language"`);
    await queryRunner.query(
      `ALTER TABLE "book" DROP COLUMN "available_copies"`,
    );
    await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "title"`);
    await queryRunner.query(
      `ALTER TABLE "book" ADD "name" character varying NOT NULL default ''`,
    );
  }
}
