import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1689253651173 implements MigrationInterface {
    name = 'InitialMigration1689253651173'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "profiles" ("id" SERIAL NOT NULL, "phone" character varying NOT NULL, "profession" character varying, "description" text, "profilePhoto" character varying, "userId" integer NOT NULL, CONSTRAINT "REL_315ecd98bd1a42dcf2ec4e2e98" UNIQUE ("userId"), CONSTRAINT "PK_8e520eb4da7dc01d0e190447c8e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ratings" ("id" SERIAL NOT NULL, "rating" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer NOT NULL, CONSTRAINT "REL_4d0b0e3a4c4af854d225154ba4" UNIQUE ("userId"), CONSTRAINT "PK_0f31425b073219379545ad68ed9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "testimonies" ("id" SERIAL NOT NULL, "testimony" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer NOT NULL, CONSTRAINT "PK_66810cc4e65709c3bb30c5679bd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "photos" ("id" SERIAL NOT NULL, "url" character varying NOT NULL, "caption" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer NOT NULL, CONSTRAINT "PK_5220c45b8e32d49d767b9b3d725" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tasks" ("id" SERIAL NOT NULL, "task" text NOT NULL, "startTime" TIMESTAMP NOT NULL DEFAULT now(), "endTime" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer NOT NULL, CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "messages" ("id" SERIAL NOT NULL, "subject" character varying NOT NULL, "body" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "senderId" integer NOT NULL, "recipientId" integer NOT NULL, "status" character varying NOT NULL DEFAULT 'new', CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "board_messages" ("id" SERIAL NOT NULL, "message" character varying NOT NULL, "type" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer NOT NULL, CONSTRAINT "PK_dd65675bfece2bb448ddd9b2172" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "projects" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" text, "status" character varying DEFAULT 'draft', "progress" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "social_media" ("id" SERIAL NOT NULL, "platform" character varying NOT NULL, "unitLeft" integer NOT NULL DEFAULT '0', "unitRight" integer NOT NULL DEFAULT '0', CONSTRAINT "UQ_ac91a1979e1b21269542993d483" UNIQUE ("platform"), CONSTRAINT "PK_54ac0fd97432069e7c9ab567f8b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles_users_users" ("roleId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_8ad3a4f60b4ec859a7d14da0536" PRIMARY KEY ("roleId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b7bf1b062e2f679df676379f17" ON "roles_users_users" ("roleId") `);
        await queryRunner.query(`CREATE INDEX "IDX_9e03966e9c69de11373506c8f9" ON "roles_users_users" ("userId") `);
        await queryRunner.query(`CREATE TABLE "projects_members_users" ("projectId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_219fa84ff8c07553d2880d397d0" PRIMARY KEY ("projectId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_dac12ae00addfb8d969275abde" ON "projects_members_users" ("projectId") `);
        await queryRunner.query(`CREATE INDEX "IDX_1c0444af9e78c947014c9648cb" ON "projects_members_users" ("userId") `);
        await queryRunner.query(`ALTER TABLE "profiles" ADD CONSTRAINT "FK_315ecd98bd1a42dcf2ec4e2e985" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ratings" ADD CONSTRAINT "FK_4d0b0e3a4c4af854d225154ba40" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "testimonies" ADD CONSTRAINT "FK_c828ec1929ea1c02b10220d669c" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "photos" ADD CONSTRAINT "FK_74da4f305b050f7d27c73b04263" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_166bd96559cb38595d392f75a35" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_2db9cf2b3ca111742793f6c37ce" FOREIGN KEY ("senderId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_f548818d46a1315d4e1d5e62da5" FOREIGN KEY ("recipientId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "board_messages" ADD CONSTRAINT "FK_eb768f93edccae132e4c447a9fc" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "roles_users_users" ADD CONSTRAINT "FK_b7bf1b062e2f679df676379f175" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "roles_users_users" ADD CONSTRAINT "FK_9e03966e9c69de11373506c8f95" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projects_members_users" ADD CONSTRAINT "FK_dac12ae00addfb8d969275abdee" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "projects_members_users" ADD CONSTRAINT "FK_1c0444af9e78c947014c9648cb9" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects_members_users" DROP CONSTRAINT "FK_1c0444af9e78c947014c9648cb9"`);
        await queryRunner.query(`ALTER TABLE "projects_members_users" DROP CONSTRAINT "FK_dac12ae00addfb8d969275abdee"`);
        await queryRunner.query(`ALTER TABLE "roles_users_users" DROP CONSTRAINT "FK_9e03966e9c69de11373506c8f95"`);
        await queryRunner.query(`ALTER TABLE "roles_users_users" DROP CONSTRAINT "FK_b7bf1b062e2f679df676379f175"`);
        await queryRunner.query(`ALTER TABLE "board_messages" DROP CONSTRAINT "FK_eb768f93edccae132e4c447a9fc"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_f548818d46a1315d4e1d5e62da5"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_2db9cf2b3ca111742793f6c37ce"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_166bd96559cb38595d392f75a35"`);
        await queryRunner.query(`ALTER TABLE "photos" DROP CONSTRAINT "FK_74da4f305b050f7d27c73b04263"`);
        await queryRunner.query(`ALTER TABLE "testimonies" DROP CONSTRAINT "FK_c828ec1929ea1c02b10220d669c"`);
        await queryRunner.query(`ALTER TABLE "ratings" DROP CONSTRAINT "FK_4d0b0e3a4c4af854d225154ba40"`);
        await queryRunner.query(`ALTER TABLE "profiles" DROP CONSTRAINT "FK_315ecd98bd1a42dcf2ec4e2e985"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1c0444af9e78c947014c9648cb"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dac12ae00addfb8d969275abde"`);
        await queryRunner.query(`DROP TABLE "projects_members_users"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9e03966e9c69de11373506c8f9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b7bf1b062e2f679df676379f17"`);
        await queryRunner.query(`DROP TABLE "roles_users_users"`);
        await queryRunner.query(`DROP TABLE "social_media"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "projects"`);
        await queryRunner.query(`DROP TABLE "board_messages"`);
        await queryRunner.query(`DROP TABLE "messages"`);
        await queryRunner.query(`DROP TABLE "tasks"`);
        await queryRunner.query(`DROP TABLE "photos"`);
        await queryRunner.query(`DROP TABLE "testimonies"`);
        await queryRunner.query(`DROP TABLE "ratings"`);
        await queryRunner.query(`DROP TABLE "profiles"`);
        await queryRunner.query(`DROP TABLE "roles"`);
    }

}
