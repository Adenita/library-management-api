import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAuthorBookRelation1719082600936 implements MigrationInterface {
    name = 'CreateAuthorBookRelation1719082600936'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "author_books" ("authorId" uuid NOT NULL, "bookId" uuid NOT NULL, CONSTRAINT "PK_29e5a26b52f13315e071c840376" PRIMARY KEY ("authorId", "bookId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_43d2c30a3b587ac731a91bef06" ON "author_books" ("authorId") `);
        await queryRunner.query(`CREATE INDEX "IDX_2c8b381c6ecaa4aa10d6830899" ON "author_books" ("bookId") `);
        await queryRunner.query(`ALTER TABLE "author_books" ADD CONSTRAINT "FK_43d2c30a3b587ac731a91bef06f" FOREIGN KEY ("authorId") REFERENCES "author"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "author_books" ADD CONSTRAINT "FK_2c8b381c6ecaa4aa10d6830899a" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "author_books" DROP CONSTRAINT "FK_2c8b381c6ecaa4aa10d6830899a"`);
        await queryRunner.query(`ALTER TABLE "author_books" DROP CONSTRAINT "FK_43d2c30a3b587ac731a91bef06f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2c8b381c6ecaa4aa10d6830899"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_43d2c30a3b587ac731a91bef06"`);
        await queryRunner.query(`DROP TABLE "author_books"`);
    }

}
