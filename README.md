# Network Monitor

Application built with technologies such as [React.js](https://react.dev/), [Nest.js](https://nestjs.com/) and [Ookla SpeedTest CLI](https://www.speedtest.net/apps/cli) to monitor network connection stability.

## Installation

1. Clone the repository.

```bash
git clone https://github.com/r1pk/network-monitor.git .
```

2. Install client dependencies.

```bash
cd client
npm install
```

3. Install server dependencies.

```bash
cd server
npm install
```

4. Install Ookla SpeedTest CLI following the [official instructions](https://www.speedtest.net/apps/cli).

## Configuration

Configuration is done by modifying the `.env` files located in the `client` and `server` folders.

### Client Configuration (`client/.env`)

Available environment variables that affect the application functionality.

| Name                   | Default     | Description                                             |
| ---------------------- | ----------- | ------------------------------------------------------- |
| `VITE_SERVER_IP`       | `127.0.0.1` | IP address of the device hosting the server application |
| `VITE_SERVER_APP_PORT` | `8080`      | Port on which the server application is running.        |

### Server Configuration (`server/.env`)

Available environment variables that affect the application functionality.

| Name                    | Default      | Description                                                                        |
| ----------------------- | ------------ | ---------------------------------------------------------------------------------- |
| `NODE_ENV`              | `production` | Application environment                                                            |
| `APP_PORT`              | `8080`       | Application port                                                                   |
| `MYSQL_HOST`            |              | Database host                                                                      |
| `MYSQL_PORT`            |              | Database port                                                                      |
| `MYSQL_DATABASE`        |              | Database name                                                                      |
| `MYSQL_USER`            |              | Database user                                                                      |
| `MYSQL_PASSWORD`        |              | Database password                                                                  |
| `DATABASE_SYNC_ENABLED` | `true`       | Determines whether to perform database structure updates based on defined entities |
| `SPEEDTEST_CLI_ARGS`    |              | Additional arguments for Ookla SpeedTest CLI                                       |

## Usage

Make sure all required dependencies are installed and the application is configured correctly according to the previous sections.

1. Start the client application.

```bash
cd client

# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

Once the client application is launched, it will be available at `http://127.0.0.1:3000`.

2. Start the server application.

```bash
cd server

# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

Once the server application is launched, its API will be available at `http://127.0.0.1:8080`.

## Docker

Application includes a fully functional docker environment, which greatly simplifies and speeds up the process of launching the application or its selected segments.

## Docker configuration (`docker/.env`)

Configuration is done by modifying the `.env` file located in the `docker` folder, which is then used by docker to set/override environment variables in the containers.

Available docker environment settings.

| Name                  | Default           | Description              |
| --------------------- | ----------------- | ------------------------ |
| `CLIENT_APP_PORT`     | `3000`            | Client application port  |
| `SERVER_IP`           | `127.0.0.1`       | IP address of the device |
| `SERVER_APP_PORT`     | `8080`            | Server application port  |
| `MYSQL_DATABASE`      | `network-monitor` | Database name            |
| `MYSQL_USER`          | `network-monitor` | Database user            |
| `MYSQL_PASSWORD`      | `network-monitor` | Database password        |
| `MYSQL_ROOT_PASSWORD` | `network-monitor` | Database root password   |

Environment variables such as `MYSQL_HOST` and `MYSQL_PORT` are set in the `docker-compose.yaml` file to ensure proper connectivity between the `database` and `server` container.

## Docker usage

Make sure docker configuration is set correctly according to the previous section.

Build and start the application.

```bash
cd docker
docker compose up --build
```

Once the application is launched, the client application will be available at `http://127.0.0.1:3000` and the server application API at `http://127.0.0.1:8080`.

## Authors

- Patryk [@r1pk](https://github.com/r1pk) Krawczyk

## License

- Project is licensed under the [MIT](LICENSE.md) license.
