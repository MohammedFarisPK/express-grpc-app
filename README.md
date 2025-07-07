# express-grpc-app

A simple application combining an Express.js web server with a gRPC service. The Express server handles HTTP requests (e.g., `GET /hello/Alice`) and uses a gRPC service to return a greeting (e.g., `{"message": "Hello, Alice!"}`).

## Features

- **Express.js**: Listens for HTTP requests at `http://localhost:3000/hello/:name`.
- **gRPC Service**: Generates greetings via `HelloService` on `localhost:50051`.
- **Integration**: Express communicates with the gRPC service to process requests.

## Test It

Use a browser or `curl`:

```bash
curl http://localhost:3000/hello/Alice


  How It Works
- User sends a request to http://localhost:3000/hello/:name.
- The Express server (server.js) extracts the name and calls the gRPC client (grpc-client.js).
- The gRPC client communicates with the gRPC server (grpc-server.js) on localhost:50051.
- The gRPC server returns a greeting (e.g., "Hello, Alice!").
- Express returns the greeting as a JSON response.
