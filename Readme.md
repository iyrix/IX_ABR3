# Mini kanban Board

## Project Description

This project is a comprehensive development environment for a web application, utilizing Docker for containerization and orchestration. It consists of a backend built with Django and Graphene, a frontend developed with React, Apollo Client, and React DnD, and a local instance of DynamoDB for data storage.

## Dockerized Deployment

### Build Docker Images

To build the Docker images for the entire application, run the following command in the project root:

```bash
docker-compose build
```

### Start Containers

Once the Docker images are built, you can start the containers with the following command:

```bash
docker-compose up
```

## Local Development Setup

### Prerequisites

Make sure you have the following installed on your local machine:

- Java
- Python
- Node.js

## Backend Setup

1. Navigate to the backend directory.
   ```bash
   cd backend
   ```
2. Create a virtual environment and activate it.
   ```bash
   python -m venv venv
   source venv/bin/activate
   ```
3. Install backend dependencies.
   ```bash
   pip install -r requirements.txt
   ```
4. Run Django server.
   ```bash
   python manage.py runserver 8080
   ```

## Frontend Setup

1. Navigate to the frontend directory.
   ```bash
   cd frontend
   ```
2. Install frontend dependencies.
   ```bash
   npm install
   ```
3. Change the start script in `package.json` to use Vite.
   ```json
   "scripts": {
     "start": "vite",
     // ...
   }
   ```
4. Start the frontend server.
   ```bash
   npm start
   ```

## DynamoDB Local Setup

1. Run DynamoDB Local using Java.
   ```bash
   java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb
   ```
2. To list all tables:
   ```bash
   aws dynamodb list-tables --endpoint-url http://localhost:8000
   ```

## AWS Configuration

1. Install AWS CLI in your virtual environment.
   ```bash
   pip install awscli
   ```
2. Configure AWS CLI.
   ```bash
   aws configure
   ```
   Set the following values:
   - AWS_ACCESS_KEY_ID=admin
   - AWS_SECRET_ACCESS_KEY=admin
   - AWS_REGION=us-east-1
