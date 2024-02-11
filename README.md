# Network-Monitor

[Nest.js](https://nestjs.com/) application designed to perform routine Internet stability tests for monitoring purposes using [Ookla SpeedTest CLI](https://www.speedtest.net/apps/cli).

## Installation

In order for the application to work properly, the [Ookla SpeedTest CLI](https://www.speedtest.net/apps/cli) application must be installed on your operating system. The installation process is described on the manufacturer's website for this software.

Use the [NPM](https://www.npmjs.com/) package manager to install all required application dependencies.

```bash
npm install
```

## Configuration

Edit the `.env` or `.env.local` file to change basic application settings.

Brief description for each available option:

- `NODE_ENV` - environment in which the application runs, e.g. `development` or `production`.
- `APPLICATION_PORT` - port on which the application will listen for requests.
- `DATABASE_HOST` - database host.
- `DATABASE_PORT` - database port.
- `DATABASE_NAME` - database name.
- `DATABASE_USER` - database user.
- `DATABASE_PASSWORD` - database password for a previously defined user.
- `DATABASE_SYNCHRONIZE` - Determines whether or not the database should be updated on the basis of the defined entities.

In order to create the initial database structure, the `DATABASE_SYNCHRONIZE` option should be set to `true` during the initial startup.

## Usage

```bash
# Starting the application in development mode
npm run start:dev

# Starting the application in production mode
npm run start:prod
```

Once started, the application will take measurements of the Internet speed in 5-minute cycles.

You can view the results of the measurements at any time at `127.0.0.1:3000/api/internet-speed-snapshot` (replace `3000` with the port set in your `.env`/`.env.local` file).

## Docker

Application has a Docker configuration that simplifies the process of running the application in development and production mode.

Launching an application using Docker requires only basic editing of the `.env` file.

(_it is recommended that you edit the `.env` file, otherwise you will have to pass the location of a different file each time you try to launch the application in Docker_).

- `DATABASE_HOST` - database host should be defined as `app-database` (name of the database container)
- `DATABASE_SYNCHRONIZE` - option should be set to `true` when the application is launched in the docker for the first time to create the basic structure of the database.

Next, start the container with the appropriate profile.

```bash
# Running the application in production mode
docker compose --profile production up -d --build

# Running the application in development mode with hot reload
docker compose --profile development up -d --build
```

## Authors

[@r1pk](https://github.com/r1pk)

## License

[MIT](https://choosealicense.com/licenses/mit/)
