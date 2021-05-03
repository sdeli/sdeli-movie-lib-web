## Description

Movie Library application

## Bootstrap the app

- As the first step create an ormconfig.json from the 'ormconfig.example.json' file and fill in the keys where you see the value 'example' written in the 'ormconfig.example.json'.
- After this you bootstrap the application the following way:

```bash
$ npm install

$ npm run migration:run

$ npm run start
# or
$ npm run start:dev
```

## Running the app

```bash
# dev:
$ npm run start
# prod:
$ npm run start:dev
```

## About the app

- This is the rest api for serve data for this front end [https://github.com/sdeli/movie-lib-web](https://github.com/sdeli/movie-lib-web)
