import { GenreService } from './genre.service';
import { GenreController } from './genre.controller';
import { Genre } from './entities/genre.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Genre])],
  controllers: [GenreController],
  providers: [GenreService],
  exports: [GenreService],
})
export class GenreModule {}
