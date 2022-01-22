import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1642846023589 implements MigrationInterface {
    name = 'migration1642846023589'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "login"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "login" character varying(100) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "name"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "name" character varying(100) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "password"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "password" character varying(100) NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "password"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "password" character varying(36) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "name"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "name" character varying(50) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "login"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "login" character varying(50) NOT NULL
        `);
    }

}
