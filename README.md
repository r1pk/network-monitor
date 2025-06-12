<div align="center">
  <h2>📡 Network Monitor</h2>
  <p>
    A modern application for monitoring internet connection stability using <strong>Nest.js</strong>, <strong>React.js</strong>, <strong>Tailwind CSS</strong>, and the <strong>Ookla SpeedTest CLI</strong>.
    <br />
    Automatically performs periodic speed tests and visualizes results with interactive charts.
  </p>
  
  <p>
    <img alt="License" src="https://img.shields.io/badge/License-MIT-green.svg" />
    <img alt="Node.js" src="https://img.shields.io/badge/Node.js-22.5-brightgreen" />
    <img alt="Nest.js" src="https://img.shields.io/badge/NestJS-%E2%9D%A4-red" />
    <img alt="React" src="https://img.shields.io/badge/React-18-blue" />
    <img alt="Tailwind CSS" src="https://img.shields.io/badge/TailwindCSS-3.4-38bdf8" />
    <img alt="Docker" src="https://img.shields.io/badge/Docker-Supported-blue" />
  </p>
</div>

## 🖼️ Preview

![Dashboard](https://i.imgur.com/yHszWZA.png)

## 🚀 Features

- 🔁 Periodic internet speed tests using the Ookla Speedtest CLI.
- 📊 Interactive charts displaying statistics history.
- ⚙️ Configurable via `.env` files.
- 🐳 Docker support for simplified deployment.
- 🧩 Modular architecture (Client & Server).

## 📦 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/r1pk/network-monitor.git .
   ```

2. Install client dependencies:

   ```bash
   cd ./client
   npm install
   ```

3. Install server dependencies:

   ```bash
   cd ./server
   npm install
   ```

4. Install the [Ookla Speedtest CLI](https://www.speedtest.net/apps/cli) by following the official instructions.

## ⚙️ Configuration

The application is configured using `.env` files located in the `client` and `server` directories.

### 📁 Client Configuration (`client/.env`)

| Variable       | Default                 | Description                      |
| -------------- | ----------------------- | -------------------------------- |
| `VITE_API_URL` | `http://127.0.0.1:8080` | Backend API URL (server module). |

### 📁 Server Configuration (`server/.env`)

| Variable                | Default      | Description                                              |
| ----------------------- | ------------ | -------------------------------------------------------- |
| `NODE_ENV`              | `production` | Application environment (`development` or `production`). |
| `SERVER_PORT`           | `8080`       | Application port.                                        |
| `DATABASE_HOST`         | _(required)_ | MySQL database hostname or IP address.                   |
| `DATABASE_PORT`         | _(required)_ | MySQL database port number.                              |
| `DATABASE_NAME`         | _(required)_ | MySQL database name.                                     |
| `DATABASE_USER`         | _(required)_ | MySQL database username.                                 |
| `DATABASE_PASSWORD`     | _(required)_ | MySQL database password.                                 |
| `DATABASE_SYNC_ENABLED` | `true`       | Synchronize database schema with entities.               |
| `SPEEDTEST_CLI_ARGS`    | _(optional)_ | Additional CLI arguments for SpeedTest CLI.              |

## 🧪 Usage

Ensure that all dependencies are installed and the configuration files are setup correctly.

### Start the Client Module

```bash
cd ./client

# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

Client will be available at: [http://127.0.0.1:3000](http://127.0.0.1:3000)

### Start the Server Module

```bash
cd ./server

# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

Server will be available at: [http://127.0.0.1:8080](http://127.0.0.1:8080)

## 🐳 Docker

This project includes docker configuration for both client and server module, simplifying setup and deployment.

### 📦 Running with Docker

1. Build and run the client module:

   ```bash
   cd ./client
   docker compose up -d --build
   ```

   Client will be available at: [http://127.0.0.1:3000](http://127.0.0.1:3000)

2. Build and run the server module:

   ```bash
   cd ./server
   docker compose up -d --build
   ```

   Server will be available at: [http://127.0.0.1:8080](http://127.0.0.1:8080)

## 👤 Author

- **Patryk Krawczyk** – [@r1pk](https://github.com/r1pk)

## 📄 License

This project is licensed under the [MIT License](LICENSE.md).
