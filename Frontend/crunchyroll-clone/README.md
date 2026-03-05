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

## 📖 Descripción

**Crunchyroll Clone** es una aplicación frontend **completa y funcional** desarrollada con **Angular 21.1.14** que emula la interfaz y funcionalidades principales de la plataforma de streaming de anime **Crunchyroll**. Este proyecto ha sido creado **exclusivamente con fines académicos y de portafolio**, con el objetivo de demostrar habilidades en desarrollo full-stack, arquitectura de aplicaciones modernas y consumo de APIs RESTful. La aplicación incluye **todas las funcionalidades básicas de una plataforma de streaming real**: autenticación completa, gestión de contenido, reproducción de videos y una interfaz de usuario profesional.

El cliente frontend se conecta a una **API RESTful robusta** construida con **Java 21, Spring Boot 3.5.9 y MySQL 8.0.46**, formando un ecosistema completo full-stack que simula un servicio de streaming real con todas las funcionalidades básicas de una plataforma de streaming profesional.

> **Nota de Integración:** Este frontend está diseñado para funcionar en conjunto con la API de backend. Para una experiencia completa, asegúrate de tener el servidor Spring Boot en ejecución.

---

## ⚖️ Disclaimer Legal

<div align="center">

⚠️ **AVISO IMPORTANTE** ⚠️

</div>

> **Este proyecto es estrictamente académico y de portafolio.** No tiene fines comerciales, no genera ingresos y no pretende infringir derechos de autor, marcas registradas o propiedad intelectual de **Crunchyroll** o cualquier otra entidad. El uso de nombres, logotipos o referencias visuales similares tiene únicamente propósitos educativos y de demostración técnica.
>
> **Crunchyroll** es una marca registrada de **Crunchyroll, LLC** (subsidiaria de **Sony Pictures Entertainment**). Este proyecto no está afiliado, respaldado ni autorizado por Crunchyroll o sus empresas relacionadas.

---

## 🛠️ Tecnologías Utilizadas

### 🎨 Stack Frontend (Cliente Angular)

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| ![Angular](https://img.shields.io/badge/Angular-red?logo=angular) | 21.1.14 | Framework principal para aplicación SPA |
| ![TypeScript](https://img.shields.io/badge/TypeScript-blue?logo=typescript) | ~5.9.2 | Lenguaje tipado para desarrollo robusto |
| ![HTML5](https://img.shields.io/badge/HTML5-orange?logo=html5) | HTML5 | Estructura semántica de componentes |
| ![CSS3/SCSS](https://img.shields.io/badge/CSS3/SCSS-purple?logo=css3) | CSS3/SCSS | Estilos y diseño responsivo |
| ![RxJS](https://img.shields.io/badge/RxJS-pink?logo=reactivex) | ~7.8.0 | Programación reactiva y manejo de streams |
| ![Angular Material](https://img.shields.io/badge/Angular_Material-3F51B5?logo=angular) | ~21.1.4 | Componentes UI Material Design |
| ![Node.js](https://img.shields.io/badge/Node.js-green?logo=node.js) | ≥18.0.0 | Entorno de ejecución y gestión de paquetes |
| ![npm](https://img.shields.io/badge/npm-CB3837?logo=npm) | 11.7.0 | Gestor de paquetes y dependencias |

### ⚙️ Stack Backend (API RESTful - Mención Honorífica)

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| ![Java](https://img.shields.io/badge/Java-ED8B00?logo=openjdk) | 21 | Lenguaje principal del backend |
| ![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?logo=springboot) | 3.5.9 | Framework para microservicios REST |
| ![MySQL](https://img.shields.io/badge/MySQL-4479A1?logo=mysql) | 8.0.46 | Sistema de gestión de base de datos |
| ![Spring Security](https://img.shields.io/badge/Spring_Security-6DB33F?logo=springsecurity) | 6.x | Autenticación y autorización |
| ![JPA/Hibernate](https://img.shields.io/badge/JPA/Hibernate-59666C?logo=hibernate) | 3.x | ORM y persistencia de datos |

---

## 📊 Estado del Proyecto y Características

### ✅ Funcionalidades Completamente Implementadas

#### 🎌 **Módulo de Animes (Completo)**
- **Home Page con Banner Dinámico**: 4 animes aleatorios destacados en banner rotativo
- **Listado Completo de Animes**: Visualización paginada y filtrada de catálogo completo
- **Tarjetas de Anime Interactivas**: Componentes reutilizables con información detallada (título, imagen, sinopsis, rating, géneros)
- **Búsqueda de animes**: Sistema de búsqueda con filtros dinámicos por título y descripción
- **Vista Detallada de Anime**: Página individual con información completa, episodios disponibles y metadatos
- **Reproducción de videos**: Reproductor de videos del almacenamiento
- **Gestión CRUD de Animes**: Panel de administración para crear, leer, actualizar y eliminar animes
- **Carga Dinámica Avanzada**: Implementación de lazy loading, skeletons y optimización de imágenes
- **Scroll infinito**: Implementación de scroll infinito para la carga de animes y videos, haciendo uso de la paginación de la api.

#### 👤 **Sistema de Autenticación y Usuarios (Completo)**
- **Registro de Usuario**: Formulario completo con validaciones en tiempo real
- **Inicio de Sesión**: Autenticación segura con tokens JWT
- **Activación de Cuenta por Email**: Sistema de verificación mediante correo electrónico
- **Recuperación de Contraseña**: Flujo completo de "Olvidé mi contraseña" con tokens temporales
- **Logout Seguro**: Cierre de sesión con limpieza de tokens y redirección
- **Protección de Rutas**: Guards de autenticación para áreas restringidas

#### 🎥 **Sistema de Videos y Reproducción (Completo)**
- **Subida de Videos para Animes**: Gestión de episodios con formularios dedicados
- **Reproductor de Video Integrado**: Componente personalizado con controles de reproducción
- **Listado de Episodios**: Organización por temporadas y números de episodio
- **Gestión CRUD de Videos**: Panel de administración para gestionar episodios

#### 🏠 **Home Page y Navegación (Completo)**
- **Banner Hero Dinámico**: 4 animes aleatorios con transiciones suaves
- **Navegación Intuitiva**: Menú responsive con todas las secciones accesibles

### 🚀 Próximas Mejoras y Optimizaciones

#### 🔄 **En Planeación para Futuras Versiones**

1. **🛠️ Módulos de administración**
   - Modulo de manejo de usuarios
   - Módulo de manejo de categorías

2. **🌟 Sistema de Favoritos y Listas**
   - Creación de listas personalizadas
   - Marcado de animes como favoritos
   - Compartir listas con otros usuarios

3. **📊 Sistema de Reseñas y Rating**
   - Comentarios y calificaciones por usuarios
   - Sistema de votación y "me gusta"
   - Moderación de contenido generado por usuarios

4. **🔔 Notificaciones y Alertas**
   - Notificaciones de nuevos episodios
   - Recordatorios de series en progreso
   - Sistema de notificaciones en tiempo real

5. **🌐 Internacionalización (i18n)**
   - Soporte para múltiples idiomas
   - Localización de interfaz y contenido
   - Sistema de traducción dinámica

---

## 🚀 Guía de Instalación y Despliegue Local

### Prerrequisitos

- **Node.js** (versión 18 o superior)
- **npm** (versión 11.7.0 o superior) - incluye Angular CLI como dependencia de desarrollo
- **Git** (para clonar el repositorio)
- **Angular CLI** (instalado globalmente opcional, pero incluido en dependencias del proyecto)
- **Backend API** (Spring Boot) en ejecución (opcional para desarrollo local)

> **Nota sobre Angular CLI:** El Angular CLI viene incluido como dependencia de desarrollo en el proyecto. Puedes usar los comandos `ng` a través de `npx` (ej: `npx ng serve`) o instalar Angular CLI globalmente con `npm install -g @angular/cli` para usar `ng` directamente.

### Pasos para Configurar el Entorno Local

1. **Clonar el Repositorio**
   ```bash
   git clone https://github.com/juda-dev/crunchyroll_clone.git
   cd crunchyroll_clone/Frontend/crunchyroll-clone
   ```

2. **Instalar Dependencias**
   ```bash
   npm install
   ```
   *Este comando instalará todas las dependencias necesarias definidas en `package.json`.*

3. **Configurar Variables de Entorno (Opcional)**
   ```bash
   # Crear archivo de entorno para configurar la URL de la API
   # Si no existe .env.example, crea un archivo .env manualmente con:
   # API_URL=http://localhost:8080/api
   # (ajusta el puerto según tu configuración del backend)
   ```

4. **Iniciar el Servidor de Desarrollo**
   ```bash
   # Opción 1: Usando npm script (recomendado)
   npm start
   
   # Opción 2: Usando Angular CLI directamente
   npx ng serve
   
   # Opción 3: Si tienes Angular CLI instalado globalmente
   ng serve
   ```

5. **Acceder a la Aplicación**
   - Abre tu navegador web
   - Navega a: `http://localhost:4200`
   - ¡La aplicación estará funcionando!

### ⚠️ Nota Importante sobre la API

> **Para que todas las funcionalidades funcionen correctamente**, es necesario tener la **API de Spring Boot** en ejecución. El frontend incluye:
> 1. **Autenticación completa** (login, registro, recuperación, activación por email)
> 2. **Gestión CRUD de animes y videos**
> 3. **Reproducción de videos y seguimiento de progreso**
> 4. **Home page dinámica con banners aleatorios**
>
> Si solo deseas probar la interfaz frontend sin el backend, puedes configurar el entorno para usar datos mockeados, pero algunas funcionalidades requerirán la API activa.

---

## 📁 Estructura de Carpetas del Proyecto

```
crunchyroll-clone/
├── src/
│   ├── app/
│   │   ├── features/           # Módulos de funcionalidades
│   │   │   ├── auth/           # Sistema de Autenticación Completo
│   │   │   │   ├── components/ # Componentes de formularios
│   │   │   │   ├── pages/      # Páginas de login/registro
│   │   │   │   ├── services/   # Servicios de autenticación
│   │   │   │   └── interfaces/ # Interfaces TypeScript
│   │   │   ├── home/           # Dashboard principal
│   │   │   │   ├── admin/      # Panel de administración
│   │   │   │   ├── pages/      # Páginas de animes
│   │   │   │   ├── shared/     # Recursos compartidos
│   │   │   │   └── user/       # Componentes de usuario
│   │   │   └── landing/        # Página de inicio
│   │   ├── shared/             # Recursos globales
│   │   │   ├── components/     # Componentes reutilizables
│   │   │   ├── guards/         # Guards de rutas
│   │   │   ├── interceptors/   # Interceptores HTTP
│   │   │   ├── loaders/        # Componentes de carga
│   │   │   ├── services/       # Servicios globales
│   │   │   └── validators/     # Validadores personalizados
│   │   ├── app.config.ts       # Configuración de la app
│   │   └── app.routes.ts       # Configuración de rutas
│   ├── main.ts                 # Punto de entrada
│   ├── material-theme.scss     # Tema personalizado de Angular Material
│   └── styles.css              # Estilos globales
├── public/                     # Archivos públicos
│   ├── favicon.ico
│   ├── background-desktop.webp
│   └── crunchyroll-juda-logo.png
├── angular.json                # Configuración de Angular CLI
├── package.json                # Dependencias y scripts
├── tsconfig.json               # Configuración TypeScript
└── README.md                   # Este archivo
```

---

## 👨‍💻 Contacto / Autor

**JuDa Dev** - Desarrollador Full Stack

[![Email](https://img.shields.io/badge/Email-D14836?logo=gmail&logoColor=white)](mailto:judadev@proton.me)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?logo=linkedin)](https://www.linkedin.com/in/judadev/)

> **¿Interesado en colaborar o tienes preguntas?** No dudes en contactarme a través de correo electrónico o LinkedIn.

---

## 📄 Licencia

Este proyecto está licenciado bajo la **GNU General Public License v3.0 (GPL-3.0)** - ver el archivo [LICENSE](LICENSE) para más detalles.

```
Este programa es software libre: puedes redistribuirlo y/o modificarlo
bajo los términos de la GNU General Public License como publicada por
the Free Software Foundation, ya sea la versión 3 de la Licencia, o
(a tu elección) cualquier versión posterior.

Este programa se distribuye con la esperanza de que sea útil,
pero SIN NINGUNA GARANTÍA; sin siquiera la garantía implícita de
COMERCIABILIDAD o IDONEIDAD PARA UN PROPÓSITO PARTICULAR. Ver la
GNU General Public License para más detalles.
```

---

<div align="center">

### ✨ **¡Gracias por visitar este proyecto!** ✨

</div>
