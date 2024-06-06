## Prerequisites

Before you begin, ensure you have the following installed on your machine:

### General Requirements
- **Git**: For cloning the repository. [Download Git here](https://git-scm.com/downloads).
- **Docker**: For running the PostgreSQL database container. [Download Docker here](https://www.docker.com/products/docker-desktop).
- **Node.js and npm**: Required for the Angular project. [Download Node.js here](https://nodejs.org/en/download/).

### Backend Requirements
- **Java JDK 11 or later**: Necessary to run the Spring Boot application. [Download JDK here](https://adoptopenjdk.net/).
- **Maven**: For managing the project’s dependencies and running the Spring Boot app. [Download Maven here](https://maven.apache.org/download.cgi).

### Frontend Requirements
- **Angular CLI**: Used to serve the Angular application and manage Angular projects. Install it via npm:
  ```markdown
  npm install -g @angular/cli
  ```

## Setup Instructions

### Start the PostgreSQL Database
Navigate to the directory containing your `docker-compose.yml` file:
```markdown
cd ./
```
Start the PostgreSQL database using Docker Compose:
```markdown
docker-compose up -d
```

### Start the Backend (Spring Boot Application)
Navigate to the backend directory:
```markdown
cd ./
```
Run the Spring Boot application using Maven:
```markdown
mvn spring-boot:run
```

### Start the Frontend (Angular Application)
Navigate to the frontend directory:
```markdown
cd ./dis-project-angular
```
Install the necessary npm packages:
```markdown
npm install
```
Serve the Angular application:
```markdown
npm start
```

## Accessing the Application
Once all components are up and running:
- The backend should be accessible via `http://localhost:8080`.
- The Angular frontend can be accessed at `http://localhost:4200`.

## Shutting Down
To stop the Docker container running PostgreSQL:
```markdown
docker-compose down
```
To stop the Angular CLI server, press `Ctrl+C` in the terminal where it is running.
To stop the Spring Boot application, press `Ctrl+C` in its terminal.
