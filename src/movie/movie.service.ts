import { SeedMovie } from './../movie.interfaces';
import { Genre } from './../genre/entities/genre.entity';
import { Actor } from './entities/actor.entity';
import { Director } from './entities/director.entity';
import { Movie } from './entities/movie.entity';
import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { readFileSync } from 'fs';

export interface CreateMovieEntityOpts {
  seedMovie: SeedMovie;
  actors: Actor[];
  directors: Director[];
  genres: Genre[];
}

@Injectable()
export class MovieService extends TypeOrmCrudService<Movie> {
  constructor(
    @InjectRepository(Movie)
    readonly repo: Repository<Movie>,
    @InjectRepository(Director)
    private readonly directorRepo: Repository<Director>,
    @InjectRepository(Actor)
    private readonly actorRepo: Repository<Actor>,
    @InjectRepository(Movie)
    private readonly moveRepo: Repository<Movie>,
  ) {
    super(repo);
  }

  seedInitialDirectors() {
    const directorNames = [
      'Quentin Tarantino',
      'Michael Matthews',
      'Ben Falcone',
      'James Gunn',
      'Anders Thomas Jensen',
      'David Fincher',
      'Don Hall, Carlos López Estrada, Paul Briggs, John Ripa',
      'Thomas Vinterberg',
      'Max Barbakow',
      'Pete Docter, Kemp Powers',
      'J Blakeson',
      'Patrick Hughes',
    ];

    const directors = directorNames.map((currDirectorName) => {
      const director = new Director();
      director.name = currDirectorName;
      return director;
    });

    return this.directorRepo.save(directors);
  }

  async seedInitialActors() {
    const actorNames = [
      "Dylan O'Brien",
      'Jessica Henwick',
      'Michael Rooker',
      'Dan Ewing',
      'Melissa McCarthy',
      'Octavia Spencer',
      'Jason Bateman',
      'Bobby Cannavale',
      'Margot Robbie',
      'Idris Elba',
      'John Cena',
      'Mads Mikkelsen',
      'Nikolaj Lie Kaas',
      'Andrea Heick Gadeberg',
      'Lars Brygmann',
      'Gary Oldman',
      'Amanda Seyfried',
      'Lily Collins',
      'Tom Pelphrey',
      'Kelly Marie Tran',
      'Awkwafina',
      'Gemma Chan',
      'Izaac Wang',
      'Thomas Bo Larsen',
      'Magnus Millang',
      'Lars Ranthe',
      'Andy Samberg',
      'Cristin Milioti',
      'J.K. Simmons',
      'Peter Gallagher',
      'Jamie Foxx',
      'Tina Fey',
      'Graham Norton',
      'Rachel House',
      'Leonardo DiCaprio',
      'Brad Pitt',
      'Emile Hirsch',
      'Rosamund Pike',
      'Peter Dinklage',
      'Eiza González',
      'Dianne Wiest',
      'Ryan Reynolds',
      'Frank Grillo',
      'Salma Hayek',
      'Samuel L. Jackson',
    ];

    const actors = actorNames.map((currDirectorName) => {
      const director = new Actor();
      director.name = currDirectorName;
      return director;
    });

    return this.actorRepo.save(actors);
  }

  async seedInitialMovies(
    directors: Director[],
    actors: Actor[],
    genres: Genre[],
  ) {
    const moviesStr = readFileSync('./assets/movies.json', 'utf-8');
    const seedMovies = JSON.parse(JSON.parse(moviesStr)) as SeedMovie[];
    const movies = seedMovies.map((seedMovie) => {
      return createMovieEntity({
        directors,
        actors,
        genres,
        seedMovie,
      });
    });

    return this.moveRepo.save(movies);
  }
}

function createMovieEntity(params: CreateMovieEntityOpts) {
  const { seedMovie, genres, actors, directors } = params;
  const genresOfCurrMov = genres.filter((currGenre) =>
    seedMovie.genres.includes(currGenre.name),
  );

  const actorsOfCurrMov = actors.filter((currActor) => {
    return seedMovie.stars.includes(currActor.name);
  });

  // console.log('directorOfCurrMov ========');
  // console.log(directors);
  // console.log(seedMovie.director);
  const directorOfCurrMov = directors.find(
    (currDirector) => currDirector.name === seedMovie.director,
  );
  // console.log(directorOfCurrMov);
  const movie = new Movie();
  movie.description = seedMovie.description;
  movie.name = seedMovie.name;
  movie.rating = parseInt(seedMovie.rating);
  // makes the image urls from tiny thumbnails to bigger thumbnails
  movie.img = seedMovie.img
    .replace(/(.*_UX).*/, '$1182_CR0,0,182,268_AL_.jpg')
    .replace(/(.*_UY).*/, '$1268_CR9,0,182,268_AL_.jpg');
  movie.actors = actorsOfCurrMov;
  movie.genres = genresOfCurrMov;
  movie.director = directorOfCurrMov;
  return movie;
}
