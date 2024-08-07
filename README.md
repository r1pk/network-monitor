# Network Monitor

Application built with [React.js](https://react.dev/), [Tailwind](https://tailwindcss.com/), [Nest.js](https://nestjs.com/), and [Ookla SpeedTest CLI](https://www.speedtest.net/apps/cli) to monitor network connection stability through periodic speed tests.

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

4. Install Ookla SpeedTest CLI by following the [official instructions](https://www.speedtest.net/apps/cli).

## Configuration

Configuration is managed by editing the `.env` files located in both the `client` and `server` directories.

### Client configuration (`client/.env`)

Available environment variables that affect the functionality of the application:

| Name           | Default                 | Description                                      |
| -------------- | ----------------------- | ------------------------------------------------ |
| `VITE_API_URL` | `http://127.0.0.1:8080` | URL to the api exposed by the server application |

### Server configuration (`server/.env`)

Available environment variables that affect the functionality of the application:

| Name                    | Default      | Description                                                                                |
| ----------------------- | ------------ | ------------------------------------------------------------------------------------------ |
| `NODE_ENV`              | `production` | Application environment                                                                    |
| `APP_PORT`              | `8080`       | Application port                                                                           |
| `MYSQL_HOST`            |              | Database host                                                                              |
| `MYSQL_PORT`            |              | Database port                                                                              |
| `MYSQL_DATABASE`        |              | Database name                                                                              |
| `MYSQL_USER`            |              | Database user                                                                              |
| `MYSQL_PASSWORD`        |              | Database password                                                                          |
| `DATABASE_SYNC_ENABLED` | `true`       | Determines whether the database structure should be updated based on the defined entities. |
| `SPEEDTEST_CLI_ARGS`    |              | Additional arguments for Ookla SpeedTest CLI                                               |

## Usage

Ensure that all necessary dependencies are installed and the application is properly configured as described in the previous sections.

1. Start the client application.

```bash
cd client

# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

Once started, the client application will be accessible at `http://127.0.0.1:3000`.

2. Start the server application.

```bash
cd server

# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

Once started, the server application api will be accessible at `http://127.0.0.1:8080`.

## Docker

Application includes a pre-configured docker environment, which significantly simplifies the process of launching the application.

## Docker configuration (`docker/.env`)

Configuration is managed by editing the `.env` file located in the `docker` directory, which docker uses to set and override environment variables in containers.

Available docker settings that affect the functionality of the application:

| Name                  | Default                 | Description                                      |
| --------------------- | ----------------------- | ------------------------------------------------ |
| `API_URL`             | `http://127.0.0.1:8080` | URL to the api exposed by the server application |
| `CLIENT_APP_PORT`     | `3000`                  | Client application port                          |
| `SERVER_APP_PORT`     | `8080`                  | Server application port                          |
| `MYSQL_DATABASE`      | `network-monitor`       | Database name                                    |
| `MYSQL_USER`          | `network-monitor`       | Database user                                    |
| `MYSQL_PASSWORD`      | `network-monitor`       | Database password                                |
| `MYSQL_ROOT_PASSWORD` | `network-monitor`       | Database root password                           |

## Docker usage

Ensure that the docker environment is properly configured as described in the previous section.

1. Build and start the application.

```bash
cd docker

docker compose up --build
```

Once started, the client application will be accessible at `http://127.0.0.1:3000`, while the server application api will be accessible at `http://127.0.0.1:8080`.

## Authors

- Patryk [@r1pk](https://github.com/r1pk) Krawczyk

## License

- Project is licensed under the [MIT](LICENSE.md) license.
