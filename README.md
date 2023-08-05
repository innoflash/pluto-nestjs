<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

This is a test API project for pluto project.
The API was designed and inspired by a free template named [Pluto](https://themewagon.github.io/pluto/dashboard.html) found [here](https://themewagon.com/?s=pluto&post_type=product)

## Documentation
The documentation is available on [Postman documentation](https://documenter.getpostman.com/view/7034853/2s946fdY5J)
- Take note of the examples on the right darker section that can show you example response data for different queries.
- The users listing is left unguarded with auth guards so you have access to the users you can use for the tinkering.

## Installation
This project can be run on docker but first you will need to make a local copy of the environment file.
```bash
cp .env.example .env
```
Next you will need to run the project via docker compose. This will setup your DB and start the API backend.
```bash
docker-compose up
```
Open another terminal tab and migrate and seed the database so you can have data to toy around with.
All users created here have the password of `secret`
```bash
docker exec -it backend npm run migrate:seed
```
That is pretty much it. The backend will be available on:
```bash
http://localhost:3000
```
