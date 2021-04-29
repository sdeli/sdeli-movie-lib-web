import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('seed')
  async seedInitialData() {
    const directors = await this.appService.seedInitialDirectors();
    const actors = await this.appService.seedInitialActors();
    const genres = await this.appService.seedInitialGenres();
    return this.appService.seedInitialMovies(directors, actors, genres);
  }
}
