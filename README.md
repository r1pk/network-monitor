<div align="center">
  <h2>Network Monitor</h2>
  <p>
    A simple, lightweight web application for monitoring network connection stability, built with <strong>Nest.js</strong>, <strong>React.js</strong>, <strong>TypeScript</strong>, <strong>Tailwind CSS</strong>, and <strong>Ookla Speedtest CLI</strong>. Automatically perform periodic network connection statistics measurements, store the results in a local database, and provide straightforward data visualizations in the form of charts.
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

- 🔁 **Periodic measurements** - Regular measurements of key network parameters, including download speed, upload speed, latency, and packet loss.
- 📊 **Interactive charts** - Clear, interactive visualizations and statistics based on collected data.
- 💾 **Persistent data storage** - Store historical results in a local database to enable long-term analysis.
- 🐳 **Docker support** - Ready-to-use configuration for running both modules in a containerized environment.
- ⚙️ **Flexible configuration** - Application settings can be customized by editing local environment variable files.

## 🖼️ Preview

![Dashboard](https://i.imgur.com/88VahqX.png)

## 📥 Download

Clone the repository using the CLI or web interface.

```
git clone https://github.com/r1pk/network-monitor.git
cd network-monitor
```

## ⚙️ Configuration

Configure the application by editing the local environment variable files (`.env`) located in each module’s root directory.

### Client configuration (`client/.env`)

| Variable         | Default                 | Description        |
| ---------------- | ----------------------- | ------------------ |
| **VITE_API_URL** | `http://localhost:8080` | Server module URL. |

### Server configuration (`server/.env`)

| Variable                  | Default      | Description                                                                 |
| ------------------------- | ------------ | --------------------------------------------------------------------------- |
| **NODE_ENV**              | `production` | Application mode (`development` or `production`).                           |
| **SERVER_PORT**           | `8080`       | Server port number.                                                         |
| **DATABASE_HOST**         | _(required)_ | MySQL database hostname or IP address.                                      |
| **DATABASE_PORT**         | _(required)_ | MySQL database port number.                                                 |
| **DATABASE_NAME**         | _(required)_ | MySQL database name.                                                        |
| **DATABASE_USER**         | _(required)_ | MySQL database username.                                                    |
| **DATABASE_PASSWORD**     | _(required)_ | MySQL database password for the specified user.                             |
| **DATABASE_SYNC_ENABLED** | `true`       | Enable automatic synchronization of database structure with local entities. |
| **SPEEDTEST_CLI_ARGS**    | _(optional)_ | Specifies additional arguments passed to Ookla Speedtest CLI.               |

## 🧪 Usage

Install all dependencies and configure required environment variables before running the project manually.

### Requirements

- [Node.js](https://nodejs.org/en) (>= 24.7)
- [Ookla Speedtest CLI](https://www.speedtest.net/apps/cli)

### Client module

The client module provides a simple web interface for analyzing data collected by the server module.

#### Install dependencies for the client module

```
cd client
npm install
```

#### Start the module

```
# development mode
npm run start:dev

# production mode
npm run build
npm run start:prod
```

Once started, the client will be available at **http://localhost:3000**

### Server module

The server module collects network connection statistics measurements and exposes them through an API for the client module.

#### Install dependencies for the server module

```
cd server
npm install
```

The server module relies on the [Ookla Speedtest CLI](https://www.speedtest.net/apps/cli), which is required for it to work properly.

#### Start the module

```
# development mode
npm run start:dev

# production mode
npm run build
npm run start:prod
```

Once started, the server will be available at **http://localhost:8080**

## 🐳 Docker

This project provides a ready-to-use docker configuration for both modules, allowing the application to run immediately after downloading, without installing additional dependencies, with consistent behavior across environments.

### Client module

```
cd client
docker compose up -d --build
```

Once started, the client will be available at **http://localhost:3000**

### Server module

```
cd server
docker compose up -d --build
```

Once started, the server will be available at **http://localhost:8080**

## 👤 Author

- **Patryk Krawczyk** - [@r1pk](https://github.com/r1pk)

## 📄 License

This project is licensed under the [MIT License](LICENSE.md).
