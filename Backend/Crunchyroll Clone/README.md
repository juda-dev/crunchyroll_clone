# Crunchyroll Clone - Backend API

<div align="center">
  <img src="src/main/resources/static/favicon.ico" alt="Crunchyroll Clone Favicon" width="64" height="64">
</div>

<div align="center">

<strong>RESTful API • Java 21 • Spring Boot • MySQL • JWT Auth</strong>

</div>

<div align="center">

![Java](https://img.shields.io/badge/Java-21-%23ED8B00?logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.9-%236DB33F?logo=springboot&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8.0.46-%234479A1?logo=mysql&logoColor=white)
[![Status](https://img.shields.io/badge/status-functional%20%E2%9C%85-brightgreen)](https://github.com/juda-dev/crunchyroll_clone)
[![License](https://img.shields.io/badge/license-GPL--3.0-lightgrey)](LICENSE)

</div>

---

## 📖 Description

**Crunchyroll Clone Backend API** is a **complete and robust** RESTful API developed with **Java 21 and Spring Boot 3.5.9** that powers the frontend client of the anime streaming platform clone. This backend provides **all the business logic, data persistence, authentication, and media management** required for a fully functional streaming service. Designed as a **portfolio and architecture demonstration project**, it showcases modern Java ecosystem tools.

The API follows **RESTful principles** and implements **stateless JWT-based authentication**, **role-based authorization**, **file upload management**, and **email verification workflows**. It serves as the **data engine** for the Angular frontend client (repository sibling), providing a complete full-stack solution that simulates a real-world streaming platform.

> **Integration Note:** This backend is designed to work seamlessly with the Angular frontend client. For a complete experience, make sure to configure both applications properly.

---

## ⚖️ Legal Disclaimer

<div align="center">

⚠️ **IMPORTANT — THIS IS A NON‑COMMERCIAL EDUCATIONAL PROJECT**

</div>

This project is a **personal portfolio piece** created for **educational and demonstration purposes only**. It is **not affiliated with, endorsed by, or connected to** Crunchyroll or any of its parent companies. No commercial use is intended.

- **No trademark infringement** is intended; all references to "Crunchyroll" are used purely for descriptive clarity.
- **No actual streaming content** is distributed; the platform simulates a streaming service using publicly available demo media.
- **No revenue** is generated; the project is 100% open‑source and non‑commercial.

---

## 🛠️ Technologies and Tools

### ⚙️ Backend Stack (Spring Boot API)

| Technology | Version | Purpose |
|------------|---------|---------|
| ![Java](https://img.shields.io/badge/Java-21-ED8B00?logo=openjdk&logoColor=white) | 21 | Core programming language |
| ![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.9-6DB33F?logo=springboot&logoColor=white) | 3.5.9 | Application framework |
| ![Spring Security](https://img.shields.io/badge/Spring%20Security-6.5.9-6DB33F?logo=springsecurity&logoColor=white) | 6.5.9 | Authentication & authorization |
| ![Spring Data JPA](https://img.shields.io/badge/Spring%20Data%20JPA-3.5.9-6DB33F?logo=spring&logoColor=white) | 3.5.9 | Database abstraction layer |
| ![MySQL](https://img.shields.io/badge/MySQL-8.0.46-4479A1?logo=mysql&logoColor=white) | 8.0.46 | Relational database |
| ![JWT](https://img.shields.io/badge/JWT-0.11.5-000000?logo=jsonwebtokens&logoColor=white) | 0.11.5 | JSON Web Tokens for stateless auth |
| ![JavaMail](https://img.shields.io/badge/JavaMail-1.6.2-0072C6?logo=gmail&logoColor=white) | 1.6.2 | Email sending (Gmail SMTP) |
| ![Thymeleaf](https://img.shields.io/badge/Thymeleaf-3.1.2-005F0F?logo=thymeleaf&logoColor=white) | 3.1.2 | HTML template engine for email templates |
| ![Validation API](https://img.shields.io/badge/Bean%20Validation-3.0.2-blue) | 3.0.2 | Request validation |

### 🧰 Development Tools

| Technology | Purpose |
|------------|---------|
| ![Maven](https://img.shields.io/badge/Maven-3.9.6-C71A36?logo=apachemaven&logoColor=white) | Dependency management & build |

---

## 🏗️ Architecture and File Structure

### 📁 Complete Project Structure

```
CrunchyrollClone/
├── src/main/java/dev/juda/
│   ├── JuDaDevApp.java                 # Spring Boot entry point
│   ├── config/                         # Configuration classes
│   │   └── AppConfig.java              # General bean configuration
│   ├── controller/                     # REST controllers
│   │   ├── AuthController.java         # Authentication endpoints
│   │   ├── AnimeController.java        # Anime management
│   │   ├── CategoryController.java     # Category management
│   │   ├── VideoController.java        # Video metadata management
│   │   └── FileController.java         # File upload/download
│   ├── service/                        # Business logic layer
│   │   ├── impl/                       # Service implementations
│   │   │   ├── AuthServiceImpl.java
│   │   │   ├── AnimeServiceImpl.java
│   │   │   ├── CategoryServiceImpl.java
│   │   │   ├── VideoServiceImpl.java
│   │   │   ├── FileServiceImpl.java
│   │   │   ├── EmailServiceImpl.java
│   │   │   └── UserServiceImpl.java
│   │   └── (interfaces)
│   ├── repository/                     # Data access layer (Spring Data JPA)
│   │   ├── UserRepository.java
│   │   ├── AnimeRepository.java
│   │   ├── CategoryRepository.java
│   │   ├── VideoRepository.java
│   │   └── RoleRepository.java
│   ├── model/                          # Data models
│   │   ├── entity/                     # JPA entities
│   │   │   ├── UserEntity.java
│   │   │   ├── RoleEntity.java
│   │   │   ├── AnimeEntity.java
│   │   │   ├── CategoryEntity.java
│   │   │   └── VideoEntity.java
│   │   └── dto/                        # Data Transfer Objects
│   │       ├── request/                # Incoming request DTOs
│   │       └── response/               # API response DTOs
│   ├── mapper/                         # MapStruct mappers
│   │   ├── UserMapper.java
│   │   ├── AnimeMapper.java
│   │   ├── CategoryMapper.java
│   │   └── VideoMapper.java
│   ├── security/                       # Security configuration
│   │   ├── SecurityConfig.java         # Main security config
│   │   ├── CorsConfig.java             # CORS configuration
│   │   ├── JpaUserDetailsService.java  # UserDetailsService implementation
│   │   └── filter/JwtAuthenticationFilter.java
│   ├── util/                           # Utilities & constants
│   │   ├── ApiPaths.java               # API route constants
│   │   ├── ErrorCatalog.java           # Error codes & messages
│   │   ├── FileHandlerUtil.java        # File handling helpers
│   │   ├── PaginationUtils.java        # Pagination utilities
│   │   ├── RoleNames.java              # Role constants
│   │   └── SecurityUtils.java          # Security helpers
│   └── exception/                      # Custom exceptions & global handler
│       ├── GlobalExceptionHandler.java
│       └── (various exception classes)
├── src/main/resources/
│   ├── application.properties           # Main configuration
│   ├── static/                          # Static assets (favicon, etc.)
│   └── templates/                       # Email templates (Thymeleaf)
├── src/test/java/                       # Unit & integration tests
├── pom.xml                              # Maven dependencies
└── README.md                            # This file
```

### 🎯 Architecture Overview

The application follows a **clean, layered architecture** with clear separation of concerns:

1. **Presentation Layer (Controllers)**: Handle HTTP requests/responses, validate input, delegate to services.
2. **Business Logic Layer (Services)**: Contain core business rules, transaction management, and orchestration.
3. **Data Access Layer (Repositories)**: Abstract database operations using Spring Data JPA.
4. **Security Layer**: JWT-based authentication, role‑based authorization, CORS configuration.
5. **Infrastructure Layer**: Utilities, configuration, exception handling, and cross‑cutting concerns.

**Key Design Decisions**:
- **DTO Pattern**: Separate request/response objects from entity models to prevent over‑posting and control serialization.
- **Centralized Exception Handling**: `GlobalExceptionHandler` provides consistent error responses across all endpoints.
- **Environment‑Based Configuration**: Sensitive data (database credentials, email passwords) stored in environment variables, not in version control.
- **Stateless Authentication**: JWT tokens stored client‑side; no server‑side session storage.

---

## ⚙️ Environment Configuration and Variables

### 🔐 **CRITICAL REQUIREMENT: Environment Variables**
To run this application successfully, you **MUST** configure the following environment variables in your IDE. These variables are referenced in `application.properties` and are **essential** for database connectivity and email functionality.

### 📋 Required Environment Variables

| Variable | Description | Example Value         |
|----------|-------------|-----------------------|
| `MYSQL_USER` | MySQL database username | `juda`                |
| `MYSQL_PASSWORD` | MySQL database password | `your_mysql_password` |
| `MAIL_USER` | Gmail account for sending emails | `juda@dev.example`          |
| `MAIL_PASSWORD` | **Google App Password** (NOT your regular Gmail password) | `xxxx xxxx xxxx xxxx` |

### ⚠️ Important Notes on Email Configuration
1. **Google App Password Required**: You **cannot** use your regular Gmail password due to Google's security policies. You must generate an **App Password**:
   - Go to your Google Account → **Security** → **2‑Step Verification** → **App passwords**.
   - Generate a new app password for "Mail" on "Windows/Mac/Linux".
   - Use the 16‑character generated password as `MAIL_PASSWORD`.
2. **Database User Permissions**: The MySQL user must have privileges to create/modify the `crunchyroll_clone` database.

### 🖥️ Setting Environment Variables

#### Option 1: IDE Configuration (IntelliJ IDEA / Eclipse)
```properties
# In Run/Debug Configuration environment variables:
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MAIL_USER=your.email@gmail.com
MAIL_PASSWORD=your_app_password
```

#### Option 2: Terminal / Shell (Linux/macOS)
```bash
# Set variables for current session
export MYSQL_USER=root
export MYSQL_PASSWORD=your_password
export MAIL_USER=your.email@gmail.com
export MAIL_PASSWORD=your_app_password
```

#### Option 3: Windows Command Prompt
```cmd
set MYSQL_USER=root
set MYSQL_PASSWORD=your_password
set MAIL_USER=your.email@gmail.com
set MAIL_PASSWORD=your_app_password
```

#### Option 4: Create `.env` file (with dotenv library)
```properties
# Create .env file in project root
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MAIL_USER=your.email@gmail.com
MAIL_PASSWORD=your_app_password
```

### 📄 `application.properties` Reference
The main configuration file references these environment variables:

```properties
# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/crunchyroll_clone?createDatabaseIfNotExist=true&allowPublicKeyRetrieval=true&useSSL=false
spring.datasource.username=${MYSQL_USER}
spring.datasource.password=${MYSQL_PASSWORD}
spring.jpa.hibernate.ddl-auto=update

# Email Configuration (Gmail SMTP)
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=${MAIL_USER}
spring.mail.password=${MAIL_PASSWORD}
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
```

---

## 🚀 Installation and Execution Guide

### Prerequisites
- **Java Development Kit (JDK) 21** or higher
- **MySQL 8.0.46** (or compatible) installed and running
- **Maven 3.9.6** (or compatible) – the project includes a Maven wrapper (`mvnw`)
- **Git** (for cloning the repository)
- **Environment Variables** configured as described above

### Step-by-Step Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/juda-dev/crunchyroll_clone.git
   cd crunchyroll_clone/Backend/"Crunchyroll Clone"
   ```

2. **Create the database schema** (if not auto‑created)
   ```sql
   CREATE DATABASE IF NOT EXISTS crunchyroll_clone;
   ```

3. **Configure environment variables** using one of the methods described in the previous section.

4. **Build the project**
   ```bash
   ./mvnw clean package -DskipTests
   ```

   This command will compile the project, run tests (except those marked with `@Disabled`), and package it as a JAR file in the `target/` directory.

5. **Run the application**

   **Option A: From your IDE (IntelliJ/Eclipse)**
   - Open the project as a Maven project
   - Locate the main class: `dev.juda.JuDaDevApp`
   - Run it directly with the configured environment variables

6. **Verify the API is running**

   Once the application starts, you should see Spring Boot startup logs. The API will be available at:
   - **Base URL**: `http://localhost:8080`

7. **Test with Postman or curl**

   ```bash
   # Test authentication endpoint
   curl -X POST http://localhost:8080/auth/signup \
        -H "Content-Type: application/json" \
        -d '{"email":"judadev@mailinator.com","password":"123456"}'
   ```


---

## 📚 API Reference (Endpoints)

### 🔐 Authentication & User Management (`/auth`)

| Method | Endpoint | Description | Required Role |
|--------|----------|-------------|---------------|
| POST | `/auth/signup` | Register a new user | None (public) |
| POST | `/auth/login` | Authenticate user and receive JWT token | None (public) |
| POST | `/auth/validate-email` | Validate email availability | None (public) |
| GET | `/auth/verify-email` | Verify email with token | None (public) |
| POST | `/auth/resend-verification-email` | Resend verification email | None (public) |
| POST | `/auth/forgot-password` | Request password reset email | None (public) |
| POST | `/auth/reset-password` | Reset password with token | None (public) |
| POST | `/auth/change-password` | Change password (authenticated user) | USER or ADMIN |
| GET | `/auth/current-user` | Get current authenticated user info | USER or ADMIN |

### 🎌 Anime Management (`/anime`)

| Method | Endpoint | Description | Required Role |
|--------|----------|-------------|---------------|
| POST | `/anime` | Create a new anime entry | ADMIN |
| GET | `/anime` | Get paginated list of all anime | USER or ADMIN |
| GET | `/anime/{id}` | Get specific anime by UUID | USER or ADMIN |
| PUT | `/anime/{id}` | Update anime details | ADMIN |
| DELETE | `/anime/{id}` | Delete anime | ADMIN |
| GET | `/anime/get-random-animes` | Get random anime selection | USER or ADMIN |

### 🏷️ Category Management (`/category`)

| Method | Endpoint | Description | Required Role |
|--------|----------|-------------|---------------|
| POST | `/category` | Create a new category | ADMIN |

### 🎬 Video Metadata Management (`/videos`)

| Method | Endpoint | Description | Required Role |
|--------|----------|-------------|---------------|
| POST | `/videos` | Create video metadata | ADMIN |
| GET | `/videos/{videoId}` | Get paginated videos for an anime (parameter videoId expects anime UUID) | USER or ADMIN |
| PUT | `/videos/{videoId}` | Update video metadata | ADMIN |
| DELETE | `/videos/{videoId}` | Delete video metadata | ADMIN |

### 📁 File Upload & Media Serving (`/files`)

| Method | Endpoint | Description | Required Role |
|--------|----------|-------------|---------------|
| POST | `/files/upload/image` | Upload image (poster/banner) | ADMIN |
| POST | `/files/upload/video` | Upload video file | ADMIN |
| DELETE | `/files/delete/image/{uuid}` | Delete image file by UUID | ADMIN |
| DELETE | `/files/delete/video/{uuid}` | Delete video file by UUID | ADMIN |
| GET | `/files/images/animes/posters/{uuid}` | Serve anime poster image | None (public) |
| GET | `/files/images/animes/banners/{uuid}` | Serve anime banner image | None (public) |
| GET | `/files/videos/{videoUuid}` | Serve video file (streaming) | None (public) |

> **Note**: All ADMIN endpoints require a valid JWT token with the `ROLE_ADMIN` authority.

### 📝 Request Body Examples

#### 🔐 Authentication Endpoints

**POST `/auth/signup`**
```json
{
  "email": "user@example.com",
  "password": "securepassword123",
  "role": "USER"
}
```

**POST `/auth/login`**
```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**POST `/auth/validate-email`**  
*Query parameter:* `email=user@example.com` (no request body)

**GET `/auth/verify-email`**  
*Query parameter:* `token=verification_token_here` (no request body)

**POST `/auth/resend-verification-email`**
```json
{
  "email": "user@example.com"
}
```

**POST `/auth/forgot-password`**
```json
{
  "email": "user@example.com"
}
```

**POST `/auth/reset-password`**
```json
{
  "token": "reset_token_here",
  "newPassword": "newsecurepassword456"
}
```

**POST `/auth/change-password`**
```json
{
  "email": "user@example.com",
  "currentPassword": "oldpassword123",
  "newPassword": "newpassword456"
}
```

#### 🎌 Anime Management

**POST `/anime`** and **PUT `/anime/{id}`**
```json
{
  "name": "Attack on Titan",
  "description": "Humanity fights for survival against giant humanoid creatures.",
  "poster": "550e8400-e29b-41d4-a716-446655440000",
  "banner": "550e8400-e29b-41d4-a716-446655440001",
  "categories": ["Action", "Drama", "Fantasy"]
}
```

#### 🏷️ Category Management

**POST `/category`**
```json
{
  "value": "Action"
}
```

#### 🎬 Video Metadata Management

**POST `/videos`** and **PUT `/videos/{videoId}`**
```json
{
  "title": "Episode 1: The Fall of Shiganshina",
  "description": "The Colossal Titan breaches Wall Maria.",
  "duration": 1440,
  "published": true,
  "src": "550e8400-e29b-41d4-a716-446655440002",
  "poster": "550e8400-e29b-41d4-a716-446655440003",
  "animeId": "550e8400-e29b-41d4-a716-446655440004"
}
```

#### 📁 File Upload Endpoints

**POST `/files/upload/image`**  
*Multipart form‑data*: `file` (image file), `type` (optional: `POSTER` or `BANNER`)

**POST `/files/upload/video`**  
*Multipart form‑data*: `file` (video file)

*Note:* File upload endpoints expect `multipart/form‑data` rather than JSON. The uploaded file UUID is returned in the response and can be used in subsequent metadata creation (anime, video).

---

## 🔐 Authentication Flow

The API uses **JWT (JSON Web Token) based stateless authentication**:

1. **Registration**: User signs up → email verification sent → user must verify email before login.
2. **Login**: User provides credentials → API validates → returns JWT token in response body.
3. **Token Usage**: Client includes token in `Authorization: Bearer <token>` header for protected endpoints.
4. **Token Expiration**: Tokens have a configurable expiration time (default: 24 hours).
5. **Password Reset**: Forgot password flow uses token‑based reset via email.

**Roles**:
- `ROLE_USER`: Basic authenticated user (can browse content)
- `ROLE_ADMIN`: Full administrative privileges (create/edit/delete content, upload files)

---

## 📧 Email Workflows

The backend integrates with **Gmail SMTP** to send transactional emails:

- **Email Verification**: Sent after registration with a verification link.
- **Password Reset**: Sent when user requests password reset.
- **Template‑Based**: Uses Thymeleaf HTML templates for professional email formatting.
- **Frontend Integration**: Email links point to the Angular frontend (`http://localhost:4200`).

**Configuration Requirements**:
- A Gmail account with 2‑Step Verification enabled.
- A Google App Password (16‑character) used as `MAIL_PASSWORD`.
- Frontend URL configured in `EmailServiceImpl`.

---

## 🛡️ Security Implementation

### 🔒 Spring Security Configuration
- **JWT Authentication Filter**: Validates tokens on each request.
- **Password Encryption**: BCrypt password hashing.
- **CORS Configuration**: Allows requests from `http://localhost:4200` (Angular frontend).
- **CSRF Protection**: Disabled for stateless API (JWT is sufficient).
- **Endpoint Protection**: Role‑based access control via `@PreAuthorize` annotations.

### 🚫 Custom Security Features
- **Email Verification**: Mandatory before first login.
- **Account Deactivation**: Support for soft‑delete and account locking.
- **Input Validation**: Jakarta Bean Validation on all request DTOs.

---

## 📁 File Upload System

The API handles media uploads with the following structure:

### Storage Strategy
- **Local Filesystem**: Uploads stored in `uploads/` directory (not in version control).
- **Organized by Type**: Separate folders for `images/` and `videos/`.
- **UUID Filenames**: Original filenames are replaced with UUIDs to prevent collisions.
- **Metadata Tracking**: File references stored in database with original names and MIME types.

### Serving Static Files
- **Dynamic Serving**: Files served via controller endpoints (`/files/images/...`).
- **Content‑Type Detection**: Automatic MIME type detection based on file extension.
- **Partial Content Support**: Video streaming with `Range` headers.

### Security Considerations
- **Admin‑Only Uploads**: Only users with `ROLE_ADMIN` can upload files.
- **File Type Validation**: Restricts uploads to allowed image/video formats.
- **Size Limits**: Configurable maximum file size per upload.

---

## 🗃️ Database Schema Overview

### Main Entities
1. **UserEntity**: Users, credentials, email verification status, roles.
2. **RoleEntity**: Roles (USER, ADMIN) with many‑to‑many relationship to users.
3. **AnimeEntity**: Anime titles, descriptions, release dates, poster/banner references.
4. **CategoryEntity**: Anime categories/genres (action, romance, etc.).
5. **VideoEntity**: Video metadata (video file references).

### Relationships
- **Anime ↔ Category**: Many‑to‑many (anime can have multiple categories).
- **Anime ↔ Video**: One‑to‑many (anime has multiple episodes/seasons).
- **User ↔ Role**: Many‑to‑many.

### Automatic Schema Management
- **Hibernate DDL‑Auto**: Set to `update` for development (automatically updates schema).

---

## 🤝 Contributing

This is a personal portfolio project, but suggestions and improvements are welcome:

1. **Fork** the repository
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add some amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

**Guidelines**:
- Follow Java coding conventions (Google Java Style)
- Write meaningful commit messages
- Add/update tests for new functionality
- Update documentation (README, code comments)

---

## 📄 License

This project is licensed under the **GPL-3.0 License** – see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Contact / Author

**JuDa Dev** - Full Stack Developer

[![Email](https://img.shields.io/badge/Email-D14836?logo=gmail&logoColor=white)](mailto:judadev@proton.me)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?logo=linkedin)](https://www.linkedin.com/in/judadev/)

---

<div align="center">

### ✨ **Thank you for visiting this project!** ✨

</div>
