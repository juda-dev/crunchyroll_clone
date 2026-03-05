# Crunchyroll Clone - Frontend Client

<div align="center">
  <img src="public/favicon.ico" alt="Crunchyroll Clone Favicon" width="64" height="64">
</div>

[![Version](https://img.shields.io/badge/version-0.0.0-blue)](https://github.com/juda-dev/crunchyroll_clone)
[![Angular](https://img.shields.io/badge/Angular-21.1.14-red)](https://angular.dev/)
[![Backend API](https://img.shields.io/badge/Backend-Java%2021%20%7C%20Spring%20Boot%203.5.9-green)](https://spring.io/)
[![Status](https://img.shields.io/badge/status-functional%20%E2%9C%85-brightgreen)](https://github.com/juda-dev/crunchyroll_clone)
[![License](https://img.shields.io/badge/license-GPL--3.0-lightgrey)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)

---

## 📖 Description

**Crunchyroll Clone** is a **complete and functional** frontend application developed with **Angular 21.1.14** that emulates the interface and main functionalities of the anime streaming platform **Crunchyroll**. This project has been created **exclusively for academic and portfolio purposes**, with the goal of demonstrating skills in full-stack development, modern application architecture, and RESTful API consumption. The application includes **all the basic functionalities of a real streaming platform**: complete authentication, content management, video playback, and a professional user interface.

The frontend client connects to a **robust RESTful API** built with **Java 21, Spring Boot 3.5.9 and MySQL 8.0.46**, forming a complete full-stack ecosystem that simulates a real streaming service with all the basic functionalities of a professional streaming platform.

> **Integration Note:** This frontend is designed to work together with the backend API. For a complete experience, make sure to have the Spring Boot server running.

---

## ⚖️ Legal Disclaimer

<div align="center">

⚠️ **IMPORTANT NOTICE** ⚠️

</div>

> **This project is strictly academic and for portfolio purposes.** It has no commercial intent, does not generate income, and does not intend to infringe copyright, trademarks, or intellectual property of **Crunchyroll** or any other entity. The use of similar names, logos, or visual references is solely for educational and technical demonstration purposes.
>
> **Crunchyroll** is a registered trademark of **Crunchyroll, LLC** (a subsidiary of **Sony Pictures Entertainment**). This project is not affiliated with, endorsed by, or authorized by Crunchyroll or its related companies.

---

## 🛠️ Technologies Used

### 🎨 Frontend Stack (Angular Client)

| Technology | Version | Purpose |
|------------|---------|---------|
| ![Angular](https://img.shields.io/badge/Angular-red?logo=angular) | 21.1.14 | Main framework for SPA application |
| ![TypeScript](https://img.shields.io/badge/TypeScript-blue?logo=typescript) | ~5.9.2 | Typed language for robust development |
| ![HTML5](https://img.shields.io/badge/HTML5-orange?logo=html5) | HTML5 | Semantic component structure |
| ![CSS3/SCSS](https://img.shields.io/badge/CSS3/SCSS-purple?logo=css3) | CSS3/SCSS | Responsive styles and design |
| ![RxJS](https://img.shields.io/badge/RxJS-pink?logo=reactivex) | ~7.8.0 | Reactive programming and stream handling |
| ![Angular Material](https://img.shields.io/badge/Angular_Material-3F51B5?logo=angular) | ~21.1.4 | Material Design UI components |
| ![Node.js](https://img.shields.io/badge/Node.js-green?logo=node.js) | ≥18.0.0 | Runtime environment and package management |
| ![npm](https://img.shields.io/badge/npm-CB3837?logo=npm) | 11.7.0 | Package and dependency manager |

### ⚙️ Backend Stack (RESTful API - Honorable Mention)

| Technology | Version | Purpose |
|------------|---------|---------|
| ![Java](https://img.shields.io/badge/Java-ED8B00?logo=openjdk) | 21 | Main backend language |
| ![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?logo=springboot) | 3.5.9 | Framework for REST microservices |
| ![MySQL](https://img.shields.io/badge/MySQL-4479A1?logo=mysql) | 8.0.46 | Database management system |
| ![Spring Security](https://img.shields.io/badge/Spring_Security-6DB33F?logo=springsecurity) | 6.x | Authentication and authorization |
| ![JPA/Hibernate](https://img.shields.io/badge/JPA/Hibernate-59666C?logo=hibernate) | 3.x | ORM and data persistence |

---

## 📊 Project Status and Features

### ✅ Fully Implemented Functionalities

#### 🎌 **Anime Module (Complete)**
- **Home Page with Dynamic Banner**: 4 random animes featured in rotating banner
- **Complete Anime Listing**: Paginated and filtered view of complete catalog
- **Interactive Anime Cards**: Reusable components with detailed information (title, image, synopsis, rating, genres)
- **Anime Search**: Search system with dynamic filters by title and description
- **Anime Detail View**: Individual page with complete information, available episodes, and metadata
- **Video Playback**: Video player for storage videos
- **Anime CRUD Management**: Administration panel to create, read, update, and delete animes
- **Advanced Dynamic Loading**: Implementation of lazy loading, skeletons, and image optimization
- **Infinite Scroll**: Infinite scroll implementation for loading animes and videos, using API pagination.

#### 👤 **Authentication and User System (Complete)**
- **User Registration**: Complete form with real-time validations
- **Login**: Secure authentication with JWT tokens
- **Email Account Activation**: Verification system via email
- **Password Recovery**: Complete "Forgot Password" flow with temporary tokens
- **Secure Logout**: Session termination with token cleanup and redirection
- **Route Protection**: Authentication guards for restricted areas

#### 🎥 **Video System and Playback (Complete)**
- **Video Upload for Animes**: Episode management with dedicated forms
- **Integrated Video Player**: Custom component with playback controls
- **Episode Listing**: Organization by seasons and episode numbers
- **Video CRUD Management**: Administration panel for managing episodes

#### 🏠 **Home Page and Navigation (Complete)**
- **Dynamic Hero Banner**: 4 random animes with smooth transitions
- **Intuitive Navigation**: Responsive menu with all sections accessible

### 🚀 Upcoming Improvements and Optimizations

#### 🔄 **Planned for Future Versions**

1. **🛠️ Administration Modules**
   - User management module
   - Category management module

2. **🌟 Favorites and Lists System**
   - Creation of personalized lists
   - Marking animes as favorites
   - Sharing lists with other users

3. **📊 Reviews and Rating System**
   - User comments and ratings
   - Voting and "like" system
   - User-generated content moderation

4. **🔔 Notifications and Alerts**
   - New episode notifications
   - Reminders for series in progress
   - Real-time notification system

5. **🌐 Internationalization (i18n)**
   - Support for multiple languages
   - Interface and content localization
   - Dynamic translation system

---

## 🚀 Local Installation and Deployment Guide

### Prerequisites

- **Node.js** (version 18 or higher)
- **npm** (version 11.7.0 or higher) - includes Angular CLI as development dependency
- **Git** (to clone the repository)
- **Angular CLI** (globally installed optional, but included in project dependencies)
- **Backend API** (Spring Boot) running (optional for local development)

> **Note about Angular CLI:** Angular CLI comes included as a development dependency in the project. You can use `ng` commands through `npx` (e.g., `npx ng serve`) or install Angular CLI globally with `npm install -g @angular/cli` to use `ng` directly.

### Steps to Set Up the Local Environment

1. **Clone the Repository**
   ```bash
   git clone https://github.com/juda-dev/crunchyroll_clone.git
   cd crunchyroll_clone/Frontend/crunchyroll-clone
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```
   *This command will install all necessary dependencies defined in `package.json`.*

3. **Configure Environment Variables (Optional)**
   ```bash
   # Create environment file to configure API URL
   # If .env.example doesn't exist, create a .env file manually with:
   # API_URL=http://localhost:8080/api
   # (adjust the port according to your backend configuration)
   ```

4. **Start Development Server**
   ```bash
   # Option 1: Using npm script (recommended)
   npm start
   
   # Option 2: Using Angular CLI directly
   npx ng serve
   
   # Option 3: If you have Angular CLI installed globally
   ng serve
   ```

5. **Access the Application**
   - Open your web browser
   - Navigate to: `http://localhost:4200`
   - The application will be running!

### ⚠️ Important Note about the API

> **For all functionalities to work correctly**, it is necessary to have the **Spring Boot API** running. The frontend includes:
> 1. **Complete authentication** (login, registration, recovery, email activation)
> 2. **CRUD management of animes and videos**
> 3. **Video playback and progress tracking**
> 4. **Dynamic home page with random banners**
>
> If you only want to test the frontend interface without the backend, you can configure the environment to use mocked data, but some functionalities will require the active API.

---

## 📁 Project Folder Structure

```
crunchyroll-clone/
├── src/
│   ├── app/
│   │   ├── features/           # Functionality modules
│   │   │   ├── auth/           # Complete Authentication System
│   │   │   │   ├── components/ # Form components
│   │   │   │   ├── pages/      # Login/register pages
│   │   │   │   ├── services/   # Authentication services
│   │   │   │   └── interfaces/ # TypeScript interfaces
│   │   │   ├── home/           # Main dashboard
│   │   │   │   ├── admin/      # Administration panel
│   │   │   │   ├── pages/      # Anime pages
│   │   │   │   ├── shared/     # Shared resources
│   │   │   │   └── user/       # User components
│   │   │   └── landing/        # Landing page
│   │   ├── shared/             # Global resources
│   │   │   ├── components/     # Reusable components
│   │   │   ├── guards/         # Route guards
│   │   │   ├── interceptors/   # HTTP interceptors
│   │   │   ├── loaders/        # Loading components
│   │   │   ├── services/       # Global services
│   │   │   └── validators/     # Custom validators
│   │   ├── app.config.ts       # App configuration
│   │   └── app.routes.ts       # Route configuration
│   ├── main.ts                 # Entry point
│   ├── material-theme.scss     # Custom Angular Material theme
│   └── styles.css              # Global styles
├── public/                     # Public files
│   ├── favicon.ico
│   ├── background-desktop.webp
│   └── crunchyroll-juda-logo.png
├── angular.json                # Angular CLI configuration
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
└── README.md                   # This file
```

---

## 👨‍💻 Contact / Author

**JuDa Dev** - Full Stack Developer

[![Email](https://img.shields.io/badge/Email-D14836?logo=gmail&logoColor=white)](mailto:judadev@proton.me)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?logo=linkedin)](https://www.linkedin.com/in/judadev/)

> **Interested in collaborating or have questions?** Don't hesitate to contact me via email or LinkedIn.

---

## 📄 License

This project is licensed under the **GNU General Public License v3.0 (GPL-3.0)** - see the [LICENSE](LICENSE) file for details.

```
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.
```

---

<div align="center">

### ✨ **Thank you for visiting this project!** ✨

</div>
