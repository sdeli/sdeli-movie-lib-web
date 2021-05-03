import { Movie } from './entities/movie.entity';
import { MovieService } from './movie.service';
import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';

@Crud({
  model: {
    type: Movie,
  },
  params: {
    id: {
      field: 'id',
      type: 'uuid',
      primary: true,
    },
  },
  query: {
    join: {
      director: {},
      actors: {},
      genres: {},
    },
  },
})
@Controller('movies')
export class MovieController implements CrudController<Movie> {
  constructor(readonly service: MovieService) {}
}
