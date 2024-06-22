import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyLoanTable1719083633311 implements MigrationInterface {
    name = 'ModifyLoanTable1719083633311'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "book" ADD "title" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "book" ADD "available_copies" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "book" ADD "language" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "loan" ADD "due_date" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "loan" ADD "status" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "loan" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "loan" DROP COLUMN "due_date"`);
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "language"`);
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "available_copies"`);
        await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "book" ADD "name" character varying NOT NULL`);
    }

}
