# Network-Monitor

Application created using [Nest.js](https://nestjs.com/) and [Ookla SpeedTest CLI](https://www.speedtest.net/apps/cli), designed to perform routine Internet stability tests for monitoring purposes.

## Installation

1. Install [Ookla SpeedTest CLI](https://www.speedtest.net/apps/cli) by following instructions on the [Ookla SpeedTest CLI page](https://www.speedtest.net/apps/cli).
2. Install required dependencies using [NPM](https://www.npmjs.com/) package manager.

```bash
npm install
```

## Configuration

Adjust application settings by editing `.env` or `.env.local` file (`.env.local` overrides `.env`).

| Name                    | Default           | Description                                                                           |
| ----------------------- | ----------------- | ------------------------------------------------------------------------------------- |
| `NODE_ENV`              | `production`      | Application environment: `development` or `production`.                               |
| `APP_PORT`              | `3000`            | Application port.                                                                     |
| `MYSQL_HOST`            | `127.0.0.1`       | MySQL database host.                                                                  |
| `MYSQL_PORT`            | `3306`            | MySQL database port.                                                                  |
| `MYSQL_DATABASE`        | `network-monitor` | MySQL database name.                                                                  |
| `MYSQL_USER`            | `network-monitor` | MySQL database user.                                                                  |
| `MYSQL_PASSWORD`        | `network-monitor` | Password for the MySQL database user.                                                 |
| `DATABASE_SYNC_ENABLED` | `true`            | Determines whether or not to perform a database update based on the defined entities. |
| `SPEEDTEST_CLI_ARGS`    |                   | Additional arguments to Ookla SpeedTest CLI.                                          |

|                                                                                                                                                 ⚠️ IMPORTANT                                                                                                                                                 |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| Option `DATABASE_SYNC_ENABLED` is set to `true` by default, which allows the application to generate the initial database structure based on the defined entities. However, this option should be set to `false` after the application has been started for the first time to avoid any potential data loss. |
|                     Option `SPEEDTEST_CLI_ARGS` can be used to include additional arguments in the command that is executed during each speed test. However, it is important to note that the `-f, -format` argument is overridden by default to maintain proper application operation.                      |

## Usage

Before running the application without Docker, make sure all required dependencies are installed and the application is properly configured.

Start the application in appropriate mode:

```bash
# Start the application in development mode
npm run start:dev

# Start the application in production mode
npm run start:prod
```

Once started, the application will perform speed tests in 5-minute cycles.

Go to `127.0.0.1:3000` in your web browser to see the results of the speed test results.

## Docker

Docker configuration, automatically installs all required dependencies, simplifying the process of launching the application in any environment.

Start the container with the appropriate profile:

```bash
# Run the application in production mode
docker compose --profile production up -d --build

# Run the application in development mode with hot reload
docker compose --profile development up -d --build
```

Once started, the application will perform speed tests in 5-minute cycles.

Go to `127.0.0.1:3000` in your web browser to see the results of the speed test results.

## Authors

[@r1pk](https://github.com/r1pk)

## License

[MIT](LICENSE.md)
