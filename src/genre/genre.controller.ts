import { GenreService } from './genre.service';
import { Genre } from './entities/genre.entity';
import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';

@Crud({
  model: {
    type: Genre,
  },
  params: {
    id: {
      field: 'id',
      type: 'uuid',
      primary: true,
    },
  },
})
@Controller('genre')
export class GenreController implements CrudController<Genre> {
  constructor(readonly service: GenreService) {}
}
