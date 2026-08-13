# Co-Working Space Booking API

A RESTful API built with Node.js, Express, Mongoose, and express-validator for managing a co-working space's workspaces and bookings.

## Features

- **Workspace Management:** Create and view available workspaces (desks, meeting rooms, private offices).
- **Booking System:** Book workspaces with overlap detection ensuring no double booking.
- **Data Validation:** Strict input validation utilizing `express-validator` and `Mongoose` schemas.
- **Docker Integration:** Fully containerized with a defined `docker-compose.yml` to orchestrate both the Node API and MongoDB database safely.

## Prerequisites

- Docker and Docker Compose

## Quick Start

1. Clone this repository or copy the code files.
2. Build and start the services using Docker Compose:

```sh
docker-compose up --build
```

The application will wait for MongoDB to be healthy, then start up and run on port 3000 (as defined in the `docker-compose.yml`).

## Environment Variables

- `PORT`: Exposed API server port (default `3000`)
- `MONGODB_URI`: Connection string for Mongoose connecting to MongoDB.

## API Endpoints

### Workspaces

- `POST /api/workspaces`
  - Body: `{ "name": "Desk A", "type": "desk", "capacity": 1, "price_per_hour": 15 }`
  - Description: Create a new workspace.
- `GET /api/workspaces`
  - Query (optional): `?type=desk`
  - Description: Retrieve all workspaces, with optional type filtering.

### Bookings

- `POST /api/bookings`
  - Body: `{ "workspace_id": "<MongoID>", "start_time": "2023-12-01T10:00:00.000Z", "end_time": "2023-12-01T12:00:00.000Z" }`
  - Description: Create a booking. Requires non-overlapping future times.
- `GET /api/bookings`
  - Description: Retrieve all bookings, populated with workspace details.
- `DELETE /api/bookings/:id`
  - Description: Cancel and delete a booking.

## Architecture

- **Node.js HTTP Server**: Explicitly creates the HTTP server wrapper on Express for robust server management.
- **Express-Validator**: Blocks invalid requests at the networking layer before hitting business logic or database operations.
- **Mongoose**: Ensures schema strictness in MongoDB.

