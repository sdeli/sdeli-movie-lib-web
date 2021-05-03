import { Actor } from './entities/actor.entity';
import { Director } from './entities/director.entity';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, Director, Actor])],
  controllers: [MovieController],
  providers: [MovieService],
  exports: [MovieService],
})
export class MovieModule {}
