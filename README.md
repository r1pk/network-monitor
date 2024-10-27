<div align="center">
  <h3 align="center">Network Monitor</h3>
  <p align="center">
    Network Monitor is an application developed using technologies such as Nest.js, Ookla SpeedTest CLI, React.js, and Tailwind. It monitors internet connection stability by performing periodic speed tests via Ookla SpeedTest CLI and presents the results in the form of visual graphs.
  </p>
</div>

## Preview

![DASHBOARD](https://i.imgur.com/yW9tWLW.png)

## Installation

1. Clone the latest version of the project from the repository.

```bash
git clone https://github.com/r1pk/network-monitor.git .
```

2. Install the client module dependencies.

```bash
cd client

npm install
```

3. Install the server module dependencies.

```bash
cd server

npm install
```

4. Install the Ookla SpeedTest CLI by following the [official instructions](https://www.speedtest.net/apps/cli).

## Configuration

The application and its individual features are configured by modifying environment variables defined in `.env` files located in the `client` and `server` folders.

### Client Module Configuration (`client/.env`)

The behavior of the client module is controlled by the following environment variables:

| Name           | Default                 | Description                             |
| -------------- | ----------------------- | --------------------------------------- |
| `VITE_API_URL` | `http://127.0.0.1:8080` | Specifies the URL to the server module. |

### Server Module Configuration (`server/.env`)

The behavior of the server module is controlled by the following environment variables:

| Name                    | Default      | Description                                                                                   |
| ----------------------- | ------------ | --------------------------------------------------------------------------------------------- |
| `NODE_ENV`              | `production` | Defines the environment (e.g., `development`, `production`).                                  |
| `SERVER_PORT`           | `8080`       | Specifies the application port.                                                               |
| `DATABASE_HOST`         |              | Specifies the host name or IP address of the MySQL server.                                    |
| `DATABASE_PORT`         |              | Specifies the port number of the MySQL server.                                                |
| `DATABASE_NAME`         |              | Specifies the MySQL database name.                                                            |
| `DATABASE_USER`         |              | Specifies the MySQL database user.                                                            |
| `DATABASE_PASSWORD`     |              | Specifies the password associated with the MySQL database user.                               |
| `DATABASE_SYNC_ENABLED` | `true`       | Determines whether to automatically update the database schema based on the defined entities. |
| `SPEEDTEST_CLI_ARGS`    |              | Specifies additional command-line arguments for the Ookla SpeedTest CLI.                      |

## Usage

Ensure that all dependencies are installed and both modules are configured properly.

1. Start the client module.

```bash
cd client

# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

Once started, the client module will be accessible at `http://127.0.0.1:3000`.

2. Start the server module.

```bash
cd server

# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

Once started, the server module api will be accessible at `http://127.0.0.1:8080`.

## Docker

The application includes a docker configuration that automates the installation of all dependencies, greatly simplifying the process of launching the application.

### Usage

1. Build and launch the application.

```bash
cd docker

docker compose up -d --build
```

Once started, the client module will be accessible at `http://127.0.0.1:3000`, while the server module api will be accessible at `http://127.0.0.1:8080`.

## Authors

- Patryk [@r1pk](https://github.com/r1pk) Krawczyk

## License

- Project is licensed under the [MIT](LICENSE.md) license.
