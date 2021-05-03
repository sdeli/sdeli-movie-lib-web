import { Genre } from './entities/genre.entity';
import { SeedMovie } from './movie.interfaces';
import { Movie } from './entities/movie.entity';
import { Actor } from './entities/actor.entity';
import { Director } from './entities/director.entity';
import { Injectable } from '@nestjs/common';
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
export class AppService {
  constructor(
    @InjectRepository(Director)
    private readonly directorRepo: Repository<Director>,
    @InjectRepository(Actor)
    private readonly actorRepo: Repository<Actor>,
    @InjectRepository(Genre)
    private readonly genreRepo: Repository<Genre>,
    @InjectRepository(Movie)
    private readonly moveRepo: Repository<Movie>,
  ) {}
  getHello(): any {
    console.log('sannya');
    return { sanya: 'Hello World!' };
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

    return this.genreRepo.save(genres);
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

  const directorOfCurrMov = directors.find(
    (currDirector) => currDirector.name === seedMovie.director,
  );

  const movie = new Movie();
  movie.description = seedMovie.description;
  movie.rating = parseInt(seedMovie.rating);
  movie.actors = actorsOfCurrMov;
  movie.genres = genresOfCurrMov;
  movie.director = directorOfCurrMov;
  return movie;
}
