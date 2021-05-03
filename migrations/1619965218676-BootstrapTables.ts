import { MigrationInterface, QueryRunner } from 'typeorm';

export class BootstrapTables1619965218676 implements MigrationInterface {
  name = 'BootstrapTables1619965218676';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "genre" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_0285d4f1655d080cfcf7d1ab141" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "actor" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_05b325494fcc996a44ae6928e5e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "director" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_b85b179882f31c43324ef124fea" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "movie" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "img" text, "name" character varying NOT NULL, "description" character varying NOT NULL, "rating" integer NOT NULL, "directorId" uuid, CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "movie_actors_actor" ("movieId" uuid NOT NULL, "actorId" uuid NOT NULL, CONSTRAINT "PK_a69e570bd35d7cd2139d12270e9" PRIMARY KEY ("movieId", "actorId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_992f9af300d8c96c46fea4e541" ON "movie_actors_actor" ("movieId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_65be8ded67af2677acfd19854c" ON "movie_actors_actor" ("actorId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "movie_genres_genre" ("movieId" uuid NOT NULL, "genreId" uuid NOT NULL, CONSTRAINT "PK_aee18568f9fe4ecca74f35891af" PRIMARY KEY ("movieId", "genreId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_985216b45541c7e0ec644a8dd4" ON "movie_genres_genre" ("movieId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1996ce31a9e067304ab168d671" ON "movie_genres_genre" ("genreId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "movie" ADD CONSTRAINT "FK_a32a80a88aff67851cf5b75d1cb" FOREIGN KEY ("directorId") REFERENCES "director"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_actors_actor" ADD CONSTRAINT "FK_992f9af300d8c96c46fea4e5419" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_actors_actor" ADD CONSTRAINT "FK_65be8ded67af2677acfd19854c2" FOREIGN KEY ("actorId") REFERENCES "actor"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_genres_genre" ADD CONSTRAINT "FK_985216b45541c7e0ec644a8dd4e" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_genres_genre" ADD CONSTRAINT "FK_1996ce31a9e067304ab168d6715" FOREIGN KEY ("genreId") REFERENCES "genre"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "movie_genres_genre" DROP CONSTRAINT "FK_1996ce31a9e067304ab168d6715"`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_genres_genre" DROP CONSTRAINT "FK_985216b45541c7e0ec644a8dd4e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_actors_actor" DROP CONSTRAINT "FK_65be8ded67af2677acfd19854c2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_actors_actor" DROP CONSTRAINT "FK_992f9af300d8c96c46fea4e5419"`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie" DROP CONSTRAINT "FK_a32a80a88aff67851cf5b75d1cb"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_1996ce31a9e067304ab168d671"`);
    await queryRunner.query(`DROP INDEX "IDX_985216b45541c7e0ec644a8dd4"`);
    await queryRunner.query(`DROP TABLE "movie_genres_genre"`);
    await queryRunner.query(`DROP INDEX "IDX_65be8ded67af2677acfd19854c"`);
    await queryRunner.query(`DROP INDEX "IDX_992f9af300d8c96c46fea4e541"`);
    await queryRunner.query(`DROP TABLE "movie_actors_actor"`);
    await queryRunner.query(`DROP TABLE "movie"`);
    await queryRunner.query(`DROP TABLE "director"`);
    await queryRunner.query(`DROP TABLE "actor"`);
    await queryRunner.query(`DROP TABLE "genre"`);
  }
}
