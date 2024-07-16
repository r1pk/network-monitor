# Network-Monitor

Network-Monitor is an application built with [Nest.js](https://nestjs.com/) and [Ookla SpeedTest CLI](https://www.speedtest.net/apps/cli) to analyze internet connection stability via periodic speed tests.

## Installation

1. Install the [Ookla SpeedTest CLI](https://www.speedtest.net/apps/cli) by following the instructions on the [Ookla SpeedTest CLI page](https://www.speedtest.net/apps/cli).
2. Install the required dependencies using the [NPM](https://www.npmjs.com/) package manager.

```bash
npm install
```

## Configuration

Available environment variables that affect the functionality of the application can be found in the `.env` file.

| Name                    | Default      | Description                                                                        |
| ----------------------- | ------------ | ---------------------------------------------------------------------------------- |
| `NODE_ENV`              | `production` | Application environment (`development` or `production`)                            |
| `APP_PORT`              | `3000`       | Application port                                                                   |
| `MYSQL_HOST`            |              | MySQL database host                                                                |
| `MYSQL_PORT`            |              | MySQL database port                                                                |
| `MYSQL_DATABASE`        |              | MySQL database name                                                                |
| `MYSQL_USER`            |              | MySQL database user                                                                |
| `MYSQL_PASSWORD`        |              | Password for MySQL database user                                                   |
| `DATABASE_SYNC_ENABLED` | `true`       | Determines whether to perform database structure updates based on defined entities |
| `SPEEDTEST_CLI_ARGS`    |              | Additional arguments for Ookla SpeedTest CLI                                       |

|                                                                                                                      ⚠️ IMPORTANT                                                                                                                       |
| :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| Option `DATABASE_SYNC_ENABLED` is set to `true` by default, which allows the application to create an initial database structure based on defined entities. This option should be set to `false` after the first start to avoid any possible data loss. |
|       Option `SPEEDTEST_CLI_ARGS` can be used to include additional arguments in the command that is executed during each speed test. In order to maintain proper application functionality, the `-f, -format` argument is overridden by default.       |

## Usage

Make sure that all required dependencies are installed and that the application is configured correctly according to the previous instructions.

Start the application in the appropriate mode:

```bash
# Production mode
npm run start:prod

# Development mode
npm run start:dev
```

Once started, the application will perform periodic speed tests in 5-minute cycles.

Go to `127.0.0.1:3000` in your web browser to see the aggregated results of the performed speed tests.

## Docker

Application comes with a docker configuration that automatically installs all the necessary dependencies, simplifying the process of deploying the application in any environment.

Start the application in the appropriate mode:

```bash
# Production mode
docker compose --profile production up -d --build

# Development mode
docker compose --profile development up --build
```

Once started, the application will perform periodic speed tests in 5-minute cycles.

Go to `127.0.0.1:3000` in your web browser to see the aggregated results of the performed speed tests.

|                                                                              ⚠️ IMPORTANT                                                                               |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| Environment variables related to the database connection are overridden by the `compose.yaml` file inside each container to ensure a proper connection to the database. |

## Authors

[@r1pk](https://github.com/r1pk)

## License

[MIT](LICENSE.md)
