<div align="center">
  <h2>Network Monitor</h2>
  <p>
    A modern application for monitoring internet connection stability, built with <strong>Nest.js</strong>, <strong>React.js</strong>, <strong>TypeScript</strong>, <strong>Tailwind CSS</strong>, and the <strong>Ookla Speedtest CLI</strong>.
    <br />
    Automatically performs periodic speed tests, stores results in a database, and provides interactive charts for visualizing network performance over time.
  </p>
  
  <p>
    <img alt="Node.js" src="https://img.shields.io/badge/Node.js-6DA55F?logo=node.js&logoColor=white" />
    <img alt="Nest.js" src="https://img.shields.io/badge/Nest.js-%23E0234E.svg?logo=nestjs&logoColor=white" />
    <img alt="React" src="https://img.shields.io/badge/React-%2320232a.svg?logo=react&logoColor=%2361DAFB" />
    <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff" />
    <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind%20CSS-%2338B2AC.svg?logo=tailwind-css&logoColor=white" />
    <img alt="Docker" src="https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=fff" />
    <img alt="License" src="https://img.shields.io/badge/License-MIT-green.svg" />
  </p>
</div>

## 🚀 Features

- 🔁 **Periodic internet speed tests** – Automatically performs speed tests using the Ookla Speedtest CLI.
- 📊 **Interactive charts** – Visualizes historical network performance with dynamic charts and statistics.
- 💾 **Persistent storage** – Stores speed test results in a database for long-term tracking and analysis.
- 🐳 **Docker support** – Provides simplified deployment using preconfigured Docker containers for client and server modules.
- ⚙️ **Flexible configuration** – Allows configuration of both client and server modules via `.env` files.

## 🖼️ Preview

![Dashboard](https://i.imgur.com/88VahqX.png)

## 📥 Download

Clone the repository to your local machine:

```
git clone https://github.com/r1pk/network-monitor.git
cd network-monitor
```

## ⚙️ Configuration

Network Monitor uses environment variables defined in local `.env` files to configure both modules.  
These files control application behavior, connection parameters, and integration with external tools.

### Client configuration (`client/.env`)

| Variable         | Default                 | Description        |
| ---------------- | ----------------------- | ------------------ |
| **VITE_API_URL** | `http://127.0.0.1:8080` | Server module URL. |

### Server configuration (`server/.env`)

| Variable                  | Default      | Description                                                                      |
| ------------------------- | ------------ | -------------------------------------------------------------------------------- |
| **NODE_ENV**              | `production` | Application mode (`development` or `production`).                                |
| **SERVER_PORT**           | `8080`       | Server port number.                                                              |
| **DATABASE_HOST**         | _(required)_ | MySQL database hostname or IP address.                                           |
| **DATABASE_PORT**         | _(required)_ | MySQL database port number.                                                      |
| **DATABASE_NAME**         | _(required)_ | MySQL database name.                                                             |
| **DATABASE_USER**         | _(required)_ | MySQL database username.                                                         |
| **DATABASE_PASSWORD**     | _(required)_ | MySQL database password for the specified user.                                  |
| **DATABASE_SYNC_ENABLED** | `true`       | Enables synchronization of the database structure with local entity definitions. |
| **SPEEDTEST_CLI_ARGS**    | _(optional)_ | Specifies additional arguments passed to Ookla Speedtest CLI.                    |

## 🧪 Usage

Before starting the application, make sure the configuration files are set up correctly.

### Client module

The client module provides a dashboard for viewing speed test results and network statistics.

#### Install required dependencies

```
cd client
npm install
```

#### Start the module

```
# development mode
npm run start:dev

# production build
npm run build
npm run start:prod
```

Once started, the client will be available at **http://127.0.0.1:3000**

### Server module

The server module processes data, interacts with the Speedtest CLI, and stores test results in the database.

#### Install required dependencies

```
cd server
npm install
```

#### Install Ookla Speedtest CLI

The server module relies on the [Ookla Speedtest CLI](https://www.speedtest.net/apps/cli). Follow the official instructions for your operating system to install it.

#### Start the module

```
# development mode
npm run start:dev

# production build
npm run build
npm run start:prod
```

Once started, the server will be available at **http://127.0.0.1:8080**

## 🐳 Docker

This project includes Docker configuration for both the client and server modules, making setup and deployment simple and consistent across environments.

### Starting the client module

```
cd client
docker compose up -d --build
```

Once started, the client will be available at **http://127.0.0.1:3000**

### Starting the server module

```
cd server
docker compose up -d --build
```

Once started, the server will be available at **http://127.0.0.1:8080**

## 👤 Author

- **Patryk Krawczyk** – [@r1pk](https://github.com/r1pk)

## 📄 License

This project is licensed under the [MIT License](LICENSE.md).
