import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDefiniteLengthToColumnEntities1719084370938 implements MigrationInterface {
    name = 'AddDefiniteLengthToColumnEntities1719084370938'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "author" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "author" ADD "name" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "book" ADD "title" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "language"`);
        await queryRunner.query(`ALTER TABLE "book" ADD "language" character varying(30) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "loan" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "loan" ADD "status" character varying(60) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "name" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "username" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying(500) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "email" character varying(100) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "username" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "loan" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "loan" ADD "status" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "language"`);
        await queryRunner.query(`ALTER TABLE "book" ADD "language" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "book" ADD "title" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "author" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "author" ADD "name" character varying NOT NULL`);
    }

}
