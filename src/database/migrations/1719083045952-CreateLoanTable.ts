import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateLoanTable1719083045952 implements MigrationInterface {
  name = 'CreateLoanTable1719083045952';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "loan" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "loan_date" TIMESTAMP NOT NULL DEFAULT now(), "return_date" TIMESTAMP, "userId" uuid, "bookId" uuid, CONSTRAINT "PK_4ceda725a323d254a5fd48bf95f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "loan" ADD CONSTRAINT "FK_ef7a63b4c4f0edd90e389edb103" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "loan" ADD CONSTRAINT "FK_1465982ea6993042a656754f4cc" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "loan" DROP CONSTRAINT "FK_1465982ea6993042a656754f4cc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "loan" DROP CONSTRAINT "FK_ef7a63b4c4f0edd90e389edb103"`,
    );
    await queryRunner.query(`DROP TABLE "loan"`);
  }
}
