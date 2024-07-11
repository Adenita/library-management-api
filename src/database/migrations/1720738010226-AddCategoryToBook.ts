import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCategoryToBook1720738010226 implements MigrationInterface {
  name = 'AddCategoryToBook1720738010226';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "book" ADD "category" character varying(60)`,
    );
    await queryRunner.query(
      `ALTER TABLE "author" ALTER COLUMN "name" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "book" ALTER COLUMN "title" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "book" ALTER COLUMN "available_copies" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "book" ALTER COLUMN "language" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "loan" ALTER COLUMN "status" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "name" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "username" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "password" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "email" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "author" ALTER COLUMN "name" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "book" ALTER COLUMN "title" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "book" ALTER COLUMN "available_copies" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "book" ALTER COLUMN "language" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "loan" ALTER COLUMN "status" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "name" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "username" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "password" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "email" DROP DEFAULT`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "email" SET DEFAULT ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "password" SET DEFAULT ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "username" SET DEFAULT ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "name" SET DEFAULT ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "loan" ALTER COLUMN "status" SET DEFAULT 'ON LOAN'`,
    );
    await queryRunner.query(
      `ALTER TABLE "book" ALTER COLUMN "language" SET DEFAULT ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "book" ALTER COLUMN "available_copies" SET DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "book" ALTER COLUMN "title" SET DEFAULT ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "author" ALTER COLUMN "name" SET DEFAULT ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "email" SET DEFAULT ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "password" SET DEFAULT ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "username" SET DEFAULT ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "name" SET DEFAULT ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "loan" ALTER COLUMN "status" SET DEFAULT 'ON LOAN'`,
    );
    await queryRunner.query(
      `ALTER TABLE "book" ALTER COLUMN "language" SET DEFAULT ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "book" ALTER COLUMN "available_copies" SET DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "book" ALTER COLUMN "title" SET DEFAULT ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "author" ALTER COLUMN "name" SET DEFAULT ''`,
    );
    await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "category"`);
  }
}
