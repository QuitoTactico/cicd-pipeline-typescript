# Pipeline CI/CD con TypeScript

Este proyecto implementa un pipeline de Integración Continua (CI) completo usando TypeScript, Express.js, Jest, Selenium y Docker.

## 🚀 Características

- **Aplicación Web**: Calculadora web desarrollada con Express.js y TypeScript
- **Análisis de Calidad**: ESLint y Prettier para mantener código limpio
- **Pruebas Unitarias**: Jest con cobertura de código
- **Pruebas de Aceptación**: Selenium WebDriver para pruebas E2E
- **Análisis Continuo**: Integración con SonarCloud
- **Containerización**: Docker para empaquetado y despliegue
- **CI/CD**: GitHub Actions automatizado

## 📋 Prerrequisitos

- Node.js 18.x o superior
- npm 8.x o superior
- Docker (para containerización)
- Google Chrome (para pruebas de Selenium)

## 🛠️ Configuración Local

### 1. Instalar dependencias

```bash
npm install
```

### 2. Compilar TypeScript

```bash
npm run build
```

### 3. Ejecutar en modo desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## 🧪 Ejecutar Pruebas

### Pruebas unitarias con cobertura

```bash
npm run test:coverage
```

### Análisis de código

```bash
# ESLint
npm run lint

# Prettier
npm run format:check
npm run format  # Para formatear automáticamente
```

### Pruebas de aceptación

Primero inicia la aplicación:

```bash
npm start
```

En otra terminal:

```bash
npm run test:acceptance
```

## 🐳 Docker

### Construir imagen

```bash
docker build -t calculadora-typescript .
```

### Ejecutar contenedor

```bash
docker run -p 3000:3000 calculadora-typescript
```

## 🔧 Configuración del Pipeline CI/CD

### 1. Configurar repositorio en GitHub

1. Crea un repositorio público llamado `cicd-pipeline-typescript`
2. Sube todo el código a la rama `main`

### 2. Configurar SonarCloud

1. Ve a [SonarCloud](https://sonarcloud.io/) y regístrate con GitHub
2. Crea una organización
3. Importa tu repositorio
4. Genera un token de acceso
5. Actualiza `sonar-project.properties` con tu información:

```properties
sonar.projectKey=[TU_USUARIO]_cicd-pipeline-typescript
sonar.organization=[TU_ORGANIZACION]
```

### 3. Configurar Docker Hub

1. Crea una cuenta en [Docker Hub](https://hub.docker.com/)
2. Genera un Access Token

### 4. Configurar Secrets en GitHub

Ve a tu repositorio > Settings > Secrets and variables > Actions y agrega:

- `SONAR_TOKEN`: Token de SonarCloud
- `DOCKERHUB_USERNAME`: Tu username de Docker Hub
- `DOCKERHUB_TOKEN`: Tu Access Token de Docker Hub

## 🏗️ Estructura del Proyecto

```
├── src/
│   ├── app.ts              # Aplicación Express principal
│   └── calculator.ts       # Lógica de la calculadora
├── tests/
│   ├── calculator.test.ts  # Pruebas unitarias de la calculadora
│   ├── app.test.ts         # Pruebas unitarias de Express
│   └── acceptance.test.ts  # Pruebas de aceptación con Selenium
├── public/
│   └── index.html          # Interfaz web de la calculadora
├── .github/workflows/
│   └── ci.yml              # Pipeline de GitHub Actions
├── package.json            # Dependencias y scripts
├── tsconfig.json           # Configuración TypeScript
├── jest.config.js          # Configuración Jest
├── .eslintrc.json          # Configuración ESLint
├── .prettierrc.json        # Configuración Prettier
├── Dockerfile              # Imagen Docker
├── .dockerignore           # Exclusiones Docker
└── sonar-project.properties # Configuración SonarCloud
```

## 🔄 Pipeline CI/CD

El pipeline se ejecuta automáticamente en cada push a `main` y incluye:

1. **Checkout del código**
2. **Setup de Node.js**
3. **Instalación de dependencias**
4. **Verificación de formato (Prettier)**
5. **Análisis de código (ESLint)**
6. **Compilación de TypeScript**
7. **Pruebas unitarias con cobertura**
8. **Pruebas de aceptación con Selenium**
9. **Análisis en SonarCloud**
10. **Construcción y publicación de imagen Docker** (solo en main)

## 📊 Métricas de Calidad

El proyecto está configurado para mantener altos estándares de calidad:

- **Cobertura de código**: Mínimo 80%
- **ESLint**: Cero errores
- **Prettier**: Formato consistente
- **SonarCloud**: Quality Gate aprobado

## 🚀 Despliegue

La imagen Docker se publica automáticamente en Docker Hub cuando se hace push a la rama `main`. Puedes ejecutar la aplicación con:

```bash
docker run -p 3000:3000 [TU_USUARIO]/cicd-pipeline-typescript:latest
```
