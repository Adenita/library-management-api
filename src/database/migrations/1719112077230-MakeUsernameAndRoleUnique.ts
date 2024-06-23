import { MigrationInterface, QueryRunner } from 'typeorm';

export class MakeUsernameAndRoleUnique1719112077230
  implements MigrationInterface
{
  name = 'MakeUsernameAndRoleUnique1719112077230';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "users"
                ADD CONSTRAINT "UNIQUE_USER_USERNAME" UNIQUE ("username")
        `);

    await queryRunner.query(`
            ALTER TABLE "role"
                ADD CONSTRAINT "UNIQUE_ROLE_TYPE" UNIQUE ("name")
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "users"
                DROP CONSTRAINT "UNIQUE_USER_USERNAME"
        `);

    await queryRunner.query(`
            ALTER TABLE "role"
                DROP CONSTRAINT "UNIQUE_ROLE_TYPE"
        `);
  }
}
