# C3FC Soccer Club CMS - Project Overview

## Project Description

This is a full-stack Content Management System (CMS) for C3FC Soccer Club, a youth soccer organization based in Houston. The application is built with a .NET 6+ Web API backend, a React/TypeScript frontend, and SQL Server database. The system allows for dynamic content management for various club pages including Home, About, Recreational Program, Youth Academy, and Competitive Program.

The name "C3FC" represents the club's philosophy of developing players through three core pillars: **Cognition**, **Competence**, and **Character**.

## Architecture Overview

The application follows a modern three-tier architecture:

### Backend
- **Technology**: .NET 6+ Web API
- **ORM**: Entity Framework Core with SQL Server
- **Authentication**: JWT (JSON Web Tokens)
- **Logging**: Serilog with file and console output
- **Architecture**: Clean Architecture with separate projects for API, Application, Core, and Infrastructure layers
- **Features**:
  - JWT-based authentication and authorization
  - Content management system for dynamic pages
  - User management with role-based access
  - Media file management
  - API health checks
  - Repository pattern for data access

### Frontend
- **Technology**: React 19+ with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with additional UI libraries
- **State Management**: Redux Toolkit with React Redux
- **UI Components**: Radix UI primitives and additional component libraries
- **Form Handling**: React Hook Form with Zod validation
- **API Integration**: Supabase client with dedicated service modules (authService, mediaService, pageService) replacing RTK Query for data fetching and mutations
- **Additional Features**:
  - Responsive design
  - Content editing capabilities
  - File upload functionality
  - Dynamic page rendering based on backend content

### Database
- **Technology**: SQL Server (based on connection strings)
- **Schema**: Designed around content management with tables for:
  - Users (authentication and authorization)
  - Pages (different sections of the website)
  - Sections (components within each page)
  - Content (the actual content for each section)
  - Media (images and other uploaded files)

### Email Service
- **Technology**: Node.js/Express
- **Features**: Email sending functionality for tryout form submissions
- **Email Provider**: Uses Nodemailer with Mailtrap for sandbox testing

## Key Features

1. **Dynamic Content Management**: The system allows administrators to manage content for multiple pages without code changes
2. **Modular Page Structure**: Pages are built from reusable sections (Hero, Content, Carousel, etc.)
3. **Responsive Design**: Fully responsive frontend for mobile and desktop users
4. **User Authentication**: JWT-based authentication with role-based access
5. **Media Management**: File upload and management system
6. **Email Integration**: Automated email notifications for tryout submissions

## Project Structure

```
C:\Users\dell\Documents\C3\
├── Backend/                 # .NET 6+ Web API
│   ├── SoccerClub.Api/      # Main API project
│   ├── SoccerClub.Application/ # Business logic
│   ├── SoccerClub.Core/     # Domain models and interfaces
│   └── SoccerClub.Infrastructure/ # Data access and external services
├── Frontend/               # React/TypeScript application
├── Database/               # SQL scripts and database files
├── EmailService/           # Node.js email service
└── Documents/              # Documentation files
```

## Building and Running

### Backend (.NET API)
1. Navigate to `Backend/SoccerClub.Api`
2. Set up your database connection string in `appsettings.json`
3. Run database migrations (if applicable)
4. Launch with: `dotnet run`
5. The API will be available at `https://localhost:7000` or `http://localhost:5000` (default ports)

### Frontend (React App)
1. Navigate to `Frontend`
2. Install dependencies: `npm install`
3. Set up environment variables in `.env`
4. Start development server: `npm run dev`
5. The frontend will be available at `http://localhost:5173`

### Email Service
1. Navigate to `EmailService`
2. Install dependencies: `npm install`
3. Set up environment variables for email service
4. Start with: `npm run start`

### Docker Deployment
The application can be deployed using Docker with the provided Dockerfiles:
- `Backend/Dockerfile` for the .NET API
- `Frontend/Dockerfile` for the React frontend
- Separate Node.js container for the email service

## Development Conventions

- Use consistent DTOs for API communication
- Follow repository pattern for data access in the backend
- Use Redux Toolkit for state management in the frontend
- Implement proper error handling and logging
- Use JWT authentication for API endpoints
- Follow TypeScript best practices in the frontend
- Maintain consistent naming conventions across services

## Database Schema

The database is designed for flexible content management:
- **Users**: Authentication and authorization information
- **Pages**: Top-level pages of the website
- **Sections**: Components within each page (Hero, Carousel, Content, etc.)
- **Content**: Key-value pairs of content for each section
- **Media**: Uploaded files and images
- **ContentMedia**: Junction table for content-media relationships

## API Endpoints

The backend provides RESTful endpoints for:
- User authentication (login, registration)
- Page management
- Section management
- Content management
- Media management
- Tryout registration
- News and announcements
- Staff management

## Configuration

The application uses various configuration files:
- `appsettings.json` in the backend for API settings
- `.env` files in the frontend for environment-specific variables
- Individual service configurations as needed

## Deployment

The application is designed for containerized deployment with Docker. Each service (backend, frontend, email service) can be independently containerized and deployed. The application has been configured for deployment to a hosting platform with the URLs referenced in the CORS configuration.

## Security

- JWT tokens for authentication and authorization
- Password hashing using ASP.NET Core Identity's PasswordHasher
- CORS configuration to allow only specific origins
- Input validation and sanitization
- Secure connection strings and sensitive configuration stored in environment variables