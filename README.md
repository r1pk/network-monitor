# Network-Monitor

Application designed to perform routine Internet stability tests for monitoring purposes. It uses [Nest.js](https://nestjs.com/) and [Ookla SpeedTest CLI](https://www.speedtest.net/apps/cli) to efficiently manage and execute these tests.

## Installation

Before using the application, make sure that the [Ookla SpeedTest CLI](https://www.speedtest.net/apps/cli) application is installed on your system. Installation procedure can be found on the [Ookla SpeedTest CLI page](https://www.speedtest.net/apps/cli).

Next, use the [NPM](https://www.npmjs.com/) package manager to install required dependencies:

```bash
npm install
```

## Configuration

Adjust application settings by editing `.env` or `.env.local` file.

Below is a brief description of each available option:

- `NODE_ENV`: Environment in which the application is running, such as `development` or `production`.
- `APPLICATION_PORT`: Port on which the application will listen for requests.
- `DATABASE_HOST`: Database host.
- `DATABASE_PORT`: Database port.
- `DATABASE_NAME`: Database name.
- `DATABASE_USER`: Database user.
- `DATABASE_PASSWORD`: Password for the database user.
- `DATABASE_SYNCHRONIZE`: Determines whether or not to perform a database update based on the defined entities.

Initialize the database structure by setting the `DATABASE_SYNCHRONIZE` option to `true` at the first start.

## Usage

```bash
# Start the application in development mode
npm run start:dev

# Start the application in production mode
npm run start:prod
```

Once started, the application will perform Internet speed measurements in 5-minute cycles.

Go to `127.0.0.1:3000` in your web browser to see the results of the Internet speed measurements in an elegant form.

## Docker

The application comes with a Docker configuration that simplifies the process of running it in both `development` and `production` modes.

Starting an application with Docker requires only basic edits to the `.env` file.

(_it's recommended to edit the `.env` file to avoid the need to pass the location of a different file each time you launch the application in Docker_)

- `DATABASE_HOST`: Set the database host to `app-database`, which is the name of the database container.
- `DATABASE_SYNCHRONIZE`: Set this option to `true` for the first time the application is launched in Docker to create the basic structure of the database.

Next, start the container with the appropriate profile:

```bash
# Run the application in production mode
docker compose --profile production up -d --build

# Run the application in development mode with hot reload
docker compose --profile development up -d --build
```

## Authors

[@r1pk](https://github.com/r1pk)

## License

[MIT](https://choosealicense.com/licenses/mit/)
