<div align="center">
  <h3 align="center">Network Monitor</h3>
  <p align="center">
    Network Monitor is an application developed using technologies such as Nest.js, Ookla SpeedTest CLI, React.js, and Tailwind. It monitors internet connection stability by performing periodic speed tests via Ookla SpeedTest CLI and presents the results in the form of visual graphs.
  </p>
</div>

## Preview

![DASHBOARD](https://i.imgur.com/yHszWZA.png)

## Installation

1. Clone the latest version of the project from the repository.

```bash
git clone https://github.com/r1pk/network-monitor.git .
```

2. Install client module dependencies.

```bash
cd client

npm install
```

3. Install server module dependencies.

```bash
cd server

npm install
```

4. Install Ookla SpeedTest CLI by following [official instructions](https://www.speedtest.net/apps/cli).

## Configuration

Application and its individual features are configured by modifying environment variables defined in `.env` files located in `client` and `server` folders.

### Client Module Configuration (`client/.env`)

Behavior of the client module is controlled by the following environment variables:

| Name           | Default                 | Description                         |
| -------------- | ----------------------- | ----------------------------------- |
| `VITE_API_URL` | `http://127.0.0.1:8080` | Specifies URL to the server module. |

### Server Module Configuration (`server/.env`)

Behavior of the server module is controlled by the following environment variables:

| Name                    | Default      | Description                                                                           |
| ----------------------- | ------------ | ------------------------------------------------------------------------------------- |
| `NODE_ENV`              | `production` | Defines environment (e.g., `development`, `production`).                              |
| `SERVER_PORT`           | `8080`       | Specifies application port.                                                           |
| `DATABASE_HOST`         |              | Specifies host name or IP address of MySQL server.                                    |
| `DATABASE_PORT`         |              | Specifies port number of MySQL server.                                                |
| `DATABASE_NAME`         |              | Specifies MySQL database name.                                                        |
| `DATABASE_USER`         |              | Specifies MySQL database user.                                                        |
| `DATABASE_PASSWORD`     |              | Specifies password associated with MySQL database user.                               |
| `DATABASE_SYNC_ENABLED` | `true`       | Determines whether to automatically update database schema based on defined entities. |
| `SPEEDTEST_CLI_ARGS`    |              | Specifies additional command-line arguments for Ookla SpeedTest CLI.                  |

## Usage

Ensure that all dependencies are installed and both modules are configured properly.

1. Start client module.

```bash
cd client

# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

Once started, client module will be accessible at `http://127.0.0.1:3000`.

2. Start server module.

```bash
cd server

# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

Once started, server module api will be accessible at `http://127.0.0.1:8080`.

## Docker

Application includes a docker configuration for each module that automates installation of all dependencies, greatly simplifying process of launching application.

### Usage

1. Build and start client module.

```bash
cd client

docker compose up -d --build
```

Once started, client module will be accessible at `http://127.0.0.1:3000`.

2. Build and start server module.

```bash
cd server

docker compose up -d --build
```

Once started, server module api will be accessible at `http://127.0.0.1:8080`.

## Authors

- Patryk [@r1pk](https://github.com/r1pk) Krawczyk

## License

- Project is licensed under [MIT](LICENSE.md) license.
