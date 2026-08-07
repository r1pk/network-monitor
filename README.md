<div align="center">
  <h1>Network Monitor</h1>
  <p>
    Network Monitor is a simple application for monitoring network connection stability. It periodically measures connection statistics and visualizes the results in charts. Built with <b>TypeScript</b>, <b>React</b>, <b>Tailwind CSS</b>, <b>Nest.js</b>, and <b>Ookla Speedtest CLI</b>.
  </p>
  <p>
    <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
    <img alt="React" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
    <img alt="Tailwind" src="https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white">
    <img alt="Nest.js" src="https://img.shields.io/badge/Nest.js-E0234E?style=for-the-badge&logo=nestjs&logoColor=white">
    <img alt="Docker ready" src="https://img.shields.io/badge/Docker-ready-2496ED?style=for-the-badge&logo=docker">
    <img alt="License MIT" src="https://img.shields.io/badge/License-MIT-42b883?style=for-the-badge">
  </p>
</div>

## Features

- Periodic measurements of network parameters such as download/upload speed, latency, and packet loss.
- Interactive charts for visualizing historical connection statistics.
- Persistent storage of measurement results in a MySQL database.
- Separate server and client modules for data collection and visualization.

## Preview

![Network Monitor Dashboard](https://i.imgur.com/g2SLYrZ.png)

## Requirements

- **Node.js**: version 24.7 or higher
- **MySQL**: version 9.4 or higher
- **Ookla Speedtest CLI**: required to perform network measurements
- **Docker** (optional, for containerized setup)

## Quick start

Network Monitor provides a ready-to-use Docker configuration, but it can also be set up manually.

### Docker setup (recommended)

1. Clone the repository:

   ```bash
   git clone https://github.com/r1pk/network-monitor.git
   cd network-monitor
   ```

2. Create `.env` files based on the provided templates:

   ```bash
   cp server/.env.default server/.env
   cp client/.env.default client/.env
   ```

3. Start the Docker environment:

   ```bash
   docker compose up -d --build
   ```

### Manual setup

1. [Install Ookla Speedtest CLI](https://www.speedtest.net/apps/cli)

2. Clone the repository:

   ```bash
   git clone https://github.com/r1pk/network-monitor.git
   cd network-monitor
   ```

3. Create `.env` files based on the provided templates:

   ```bash
   cp server/.env.default server/.env
   cp client/.env.default client/.env
   ```

   Update the values in the created `.env` files before starting the application.

4. Install dependencies for the server module:

   ```bash
   cd server
   npm install
   ```

5. Build and start the server:

   ```bash
   npm run build
   npm run start:prod
   ```

6. Install dependencies for the client module:

   ```bash
   cd client
   npm install
   ```

7. Build and start the client:

   ```bash
   npm run build
   npm run start:prod
   ```

## Usage

Once the application is started, open it in your browser:

- http://127.0.0.1:3000 - web interface with charts and statistics

The application automatically collects network measurements and presents the results through the web interface.

## Configuration

Each module includes its own environment file with a default configuration for quick setup, which can be adjusted to match your environment or preferences.

### Client configuration

Location: `client/.env` (created from `client/.env.default`)

- **VITE_API_URL** - URL of the server API used by the client application.

### Server configuration

Location: `server/.env` (created from `server/.env.default`)

- **NODE_ENV** - Application mode (`development` or `production`).
- **SERVER_PORT** - Server port number.
- **DATABASE_HOST** - Hostname or IP address of the MySQL database server.
- **DATABASE_PORT** - Port number of the MySQL database server.
- **DATABASE_NAME** - Name of the MySQL database used by the application.
- **DATABASE_USER** - Username used to connect to the database.
- **DATABASE_PASSWORD** - Password for the specified database user.
- **DATABASE_SYNC_ENABLED** - Enables automatic synchronization of the database schema with application entities.
- **SPEEDTEST_CLI_ARGS** - Optional additional arguments passed to the Ookla Speedtest CLI.

## Author

**Patryk Krawczyk** - [@r1pk](https://github.com/r1pk)

## License

This project is licensed under the [MIT License](LICENSE.md).
