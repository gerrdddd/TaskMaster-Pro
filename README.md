# TaskMaster Pro

Sistema de Gestión de Tareas, Empleados y Departamentos

**Materia:** Bases de Datos Avanzadas  
**Universidad:** Universidad Politécnica de Aguascalientes (UPA)

---

# Descripción General

TaskMaster Pro es una aplicación web desarrollada para la administración y seguimiento de tareas dentro de una organización. El sistema permite gestionar departamentos, empleados y tareas asignadas, facilitando el control de actividades y la organización del trabajo.

El proyecto fue desarrollado utilizando una arquitectura **Full-Stack**, integrada por:

- **Base de datos:** MySQL
- **Backend:** NestJS
- **Frontend:** Next.js

El sistema implementa operaciones **CRUD (Crear, Consultar, Actualizar y Eliminar)** para la administración de departamentos, empleados y tareas, además de consultas SQL avanzadas para la obtención de reportes.

---

# Tecnologías utilizadas

| Tecnología | Uso |
|------------|-----|
| MySQL | Base de datos relacional |
| NestJS | Desarrollo del Backend |
| Next.js | Desarrollo del Frontend |
| TypeORM | Acceso y gestión de la base de datos |
| React | Construcción de la interfaz |
| Tailwind CSS | Diseño de la interfaz |
| TypeScript | Lenguaje de programación |
| Postman | Pruebas de la API REST |

---

# Estructura del proyecto

```
TaskMaster-Pro/
│
├── database/
│   ├── README.md
│   ├── schema.sql
│   ├── seeds.sql
│   └── screenshots/
│
├── backend/
│   ├── README.md
│   ├── src/
│   └── screenshots/
│
├── frontend/
│   ├── README.md
│   ├── app/
│   └── screenshots/
│
├── postman/
│   └── TaskMaster_collection.json
│
└── README.md
```

---

# Funcionalidades principales

- Dashboard principal con indicadores del sistema.
- Gestión de departamentos.
- Gestión de empleados.
- Gestión de tareas.
- Asignación de tareas a empleados.
- Operaciones CRUD completas.
- Consultas SQL relacionales.
- API REST desarrollada con NestJS.

---

# Instalación rápida

## Clonar el repositorio

```bash
git clone https://github.com/gerrdddd/TaskMaster-Pro.git
```

---

## Base de datos

Importar los siguientes archivos en MySQL:

- `database/schema.sql`
- `database/seeds.sql`

---

## Backend

```bash
cd backend
npm install
npm run start:dev
```

Servidor:

```
http://localhost:3000
```

---

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Aplicación:

```
http://localhost:3001
```

*(Modificar el puerto según la configuración del proyecto.)*

---

# Evidencias

La documentación y las capturas de pantalla se encuentran dentro de cada módulo del proyecto:

- **database/README.md**: Diagrama entidad-relación y evidencias de la base de datos.
- **backend/README.md**: Evidencias del funcionamiento de la API REST mediante Postman.
- **frontend/README.md**: Capturas de la interfaz del sistema y sus módulos.

---

# Autor

**Gerardo Ortiz López**

Ingeniería en Tecnologías de la Información e Innovación Digital

Universidad Politécnica de Aguascalientes