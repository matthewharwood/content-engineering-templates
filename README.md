# Deno Server Template

A simple Deno server template with API endpoints and static file serving, ready for Deno Deploy.

## Features

- 🚀 Simple HTTP server using Deno's standard library
- 📁 Serves static HTML files
- 🔌 REST API endpoint example
- ☁️ Ready for Deno Deploy
- 🔧 Development mode with file watching

## Project Structure

```
.
├── main.ts         # Main server file
└── deno.json       # Deno configuration
```

## Prerequisites

- [Deno](https://deno.com/) installed on your machine

## Running Locally

### Development Mode (with auto-reload)

```bash
deno task dev
```

This will start the server on `http://localhost:8000` with file watching enabled.

### Production Mode

```bash
deno task start
```

Or directly:

```bash
deno run --allow-net --allow-read --allow-env main.ts
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Serves the index.html file |
| GET | `/api/hello` | Returns a JSON hello message |

## Testing the API

Once the server is running, you can:

1. Visit `http://localhost:8000` in your browser to see the web interface
2. Click the "Call /api/hello" button to test the API endpoint
3. Or use curl:

```bash
curl http://localhost:8000/api/hello
```

## Environment Variables

- `PORT` - Server port (defaults to 8000)

## Deploying to Deno Deploy

1. Push your code to a GitHub repository
2. Go to [Deno Deploy](https://deno.com/deploy)
3. Create a new project and link your GitHub repository
4. Set the entry point to `main.ts`
5. Deploy!

The server automatically uses the PORT environment variable provided by Deno Deploy.

## Permissions

The server requires the following Deno permissions:
- `--allow-net`: For serving HTTP requests
- `--allow-read`: For reading the index.html file
- `--allow-env`: For reading the PORT environment variable