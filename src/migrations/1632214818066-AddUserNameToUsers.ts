import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUserNameToUsers1632214818066 implements MigrationInterface {
    name = 'AddUserNameToUsers1632214818066'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."users" ADD "username" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."users" DROP COLUMN "username"`);
    }

}
