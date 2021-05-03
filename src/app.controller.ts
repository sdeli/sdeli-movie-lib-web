import { MovieService } from './movie/movie.service';
import { GenreService } from './genre/genre.service';
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly genreService: GenreService,
    private readonly movieService: MovieService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('seed')
  async seedInitialData() {
    const directors = await this.movieService.seedInitialDirectors();
    const actors = await this.movieService.seedInitialActors();
    const genres = await this.genreService.seedInitialGenres();
    return this.movieService.seedInitialMovies(directors, actors, genres);
  }
}
