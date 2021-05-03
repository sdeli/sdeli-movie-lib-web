import { Director } from './../movie/entities/director.entity';
import { Genre } from './entities/genre.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class GenreService extends TypeOrmCrudService<Genre> {
  constructor(
    @InjectRepository(Genre)
    readonly repo: Repository<Genre>,
  ) {
    super(repo);
  }

  seedInitialGenres() {
    const genreNames = [
      'Action',
      'Adventure',
      'Comedy',
      'Drama',
      'Animation',
      'Short',
      'Romance',
      'Musical',
      'Crime',
      'Sport',
      'Sci-Fi',
      'Biography',
      'Fantasy',
      'Mystery',
      'Family',
      'Thriller',
    ];

    const genres = genreNames.map((currDirectorName) => {
      const director = new Director();
      director.name = currDirectorName;
      return director;
    });

    return this.repo.save(genres);
  }
}
