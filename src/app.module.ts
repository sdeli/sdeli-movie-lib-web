import { Genre } from './entities/genre.entity';
import { Actor } from './entities/actor.entity';
import { Movie } from './entities/movie.entity';
import { Director } from './entities/director.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([Movie, Director, Actor, Genre]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
