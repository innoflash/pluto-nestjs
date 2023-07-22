import { MigrationInterface, QueryRunner } from "typeorm";

export class TestimonyTitle1690034596273 implements MigrationInterface {
    name = 'TestimonyTitle1690034596273'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "testimonies" ADD "title" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "testimonies" DROP COLUMN "title"`);
    }

}
