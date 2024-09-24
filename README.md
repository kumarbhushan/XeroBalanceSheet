# Xero Balance Sheet

This project is a simple one-page application to display the Balance Sheet Report from the Xero API using a mock Xero Balance Sheet API Docker image. The system consists of a **backend** built with Node.js and TypeScript, and a **frontend** built with React and TypeScript. Both are containerized using Docker and orchestrated with Docker Compose.

## Project Structure
```bash
XeroBalanceSheet/
  ├── backend/
  │   ├── src/
  │   ├── package.json
  │   ├── Dockerfile
  ├── frontend/
  │   ├── src/
  │   ├── package.json
  │   ├── Dockerfile
  ├── docker-compose.yml
  ├── README.md
```

## Technologies Used

- **Backend**: Node.js with TypeScript
- **Frontend**: React with TypeScript
- **Mock Xero API**: Docker image [`jaypeng2015/show-me-the-money`](https://hub.docker.com/r/jaypeng2015/show-me-the-money)
- **Containerization**: Docker & Docker Compose

## Features

- **Backend**:
  - Fetches balance sheet data from the mock Xero API.
  - Provides a REST API endpoint for the frontend.
  - Includes error handling.
  - Unit tests implemented with Jest.
  
- **Frontend**:
  - Displays balance sheet data in a table.
  - Fetches data from the backend API.
  - Includes basic unit tests with Jest and React Testing Library.

## Prerequisites

To run this project locally, you need to have the following installed:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Getting Started

### 1. Clone the repository

### 2. Build and Run with Docker Compose

To start the application, build and run the containers with Docker Compose:

```bash
docker-compose up --build
```

This will:

 - Build and start the backend service (on port 3002).
 - Build and start the frontend service (on port 3001).
 - Pull and run the mock Xero API (on port 3000 internally).

### 3. Access the Application

 - Frontend: Open your browser and go to http://localhost:3001.
The React app will display the balance sheet data in a table.

 - Backend: The backend API is available at http://localhost:3002/balance-sheet.

### 4. Running Tests

You can run unit tests for both the backend and frontend.

Backend (Jest tests for the balance sheet API):
```bash
cd backend
npm test
```
Frontend (Jest and React Testing Library tests):
```bash
cd frontend
npm test
```

## Project Details
### Backend
The backend is a Node.js app written in TypeScript. It exposes an API endpoint at `/balance-sheet` to fetch the balance sheet data from the mock Xero API.

**API Route**: `/balance-sheet`
Xero Mock API: The mock API is pulled from the Docker Hub and runs in its own container, exposed on port **3001** internally.
### Frontend
The frontend is a React app written in TypeScript. It fetches the balance sheet data from the backend and displays it in a table.

**Display**: The data returned from the API is displayed in a table format.
Error Handling: Errors are logged in the browser console in case the API fails.

### Future Improvements
 - Make Rest api scalable.
 - Improve frontend styling with tailwind etc.
 - Add reverse proxy to frontend
 - Include integration and automation test cases.