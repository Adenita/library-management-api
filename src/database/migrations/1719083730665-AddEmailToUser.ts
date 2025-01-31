import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddEmailToUser1719083730665 implements MigrationInterface {
  name = 'AddEmailToUser1719083730665';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "email" character varying NOT NULL default ''`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
  }
}
