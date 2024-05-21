# Network-Monitor

Application created using [Nest.js](https://nestjs.com/) and [Ookla SpeedTest CLI](https://www.speedtest.net/apps/cli), designed to perform routine Internet stability tests for monitoring purposes.

## Installation

1. Install [Ookla SpeedTest CLI](https://www.speedtest.net/apps/cli) by following instructions on [Ookla SpeedTest CLI page](https://www.speedtest.net/apps/cli).
2. Install required dependencies using [NPM](https://www.npmjs.com/) package manager.

```bash
npm install
```

## Configuration

Adjust application settings by editing `.env` or `.env.local` file (`.env.local` overrides `.env`).

| Name                    | Default           | Description                                                               |
| ----------------------- | ----------------- | ------------------------------------------------------------------------- |
| `NODE_ENV`              | `production`      | Application environment: `development` or `production`.                   |
| `APP_PORT`              | `3000`            | Application port.                                                         |
| `MYSQL_HOST`            |                   | MySQL database host.                                                      |
| `MYSQL_PORT`            |                   | MySQL database port.                                                      |
| `MYSQL_DATABASE`        | `network-monitor` | MySQL database name.                                                      |
| `MYSQL_USER`            | `network-monitor` | MySQL database user.                                                      |
| `MYSQL_PASSWORD`        | `network-monitor` | Password for MySQL database user.                                         |
| `DATABASE_SYNC_ENABLED` | `true`            | Determines whether to perform database updates based on defined entities. |
| `SPEEDTEST_CLI_ARGS`    |                   | Additional arguments to Ookla SpeedTest CLI.                              |

|                                                                                                                      ⚠️ IMPORTANT                                                                                                                      |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| Option `DATABASE_SYNC_ENABLED` is set to `true` by default, which allows the application to generate an initial database structure based on defined entities. Option should be set to `false` after the first launch to avoid any potential data loss. |
|          Option `SPEEDTEST_CLI_ARGS` can be used to include additional arguments in command that is executed during each speed test. Note that the `-f, -format` argument is overridden by default to maintain proper application operation.           |

## Usage

Ensure that all necessary dependencies are installed and the application is configured correctly before launching the application.

Start the application in appropriate mode:

```bash
# Production mode
npm run start:prod

# Development mode
npm run start:dev
```

Once started, the application will perform speed tests in 5-minute cycles.

Go to `127.0.0.1:3000` in your web browser to see summary generated from collected data.

## Docker

Docker configuration, automatically installs all necessary dependencies, simplifying process of application deployment in any environment.

Start the container with the appropriate profile:

```bash
# Production mode
npm run start:docker:prod

# Development mode
npm run start:docker:dev
```

Commands above are abbreviations for the docker compose cli commands

```bash
# Production mode
docker compose --profile production up -d --build

# Development mode
docker compose --profile development up --build
```

Once started, the application will perform speed tests in 5-minute cycles.

Go to `127.0.0.1:3000` in your web browser to see summary generated from collected data.

|                                                                               ⚠️ IMPORTANT                                                                               |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| Environment variables `MYSQL_HOST` and `MYSQL_PORT` are overridden by the `docker-compose.yaml` file inside app container to ensure a proper connection to the database. |

## Authors

[@r1pk](https://github.com/r1pk)

## License

[MIT](LICENSE.md)
