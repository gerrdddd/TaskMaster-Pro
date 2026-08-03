# Colección de Postman

Esta carpeta contiene la colección de Postman utilizada para probar los servicios REST del proyecto **TaskMaster Pro**.

## Archivo incluido

- `TaskMaster_collection.json`

## Endpoints incluidos

### Departamentos

- GET /departamentos
- GET /departamentos/:id
- POST /departamentos
- PATCH /departamentos/:id
- DELETE /departamentos/:id

### Empleados

- GET /empleados
- GET /empleados/:id
- POST /empleados
- PATCH /empleados/:id
- DELETE /empleados/:id

### Tareas

- GET /tareas
- GET /tareas/:id
- POST /tareas
- PATCH /tareas/:id
- DELETE /tareas/:id

## Uso

1. Abrir Postman.
2. Seleccionar **Import**.
3. Elegir el archivo `TaskMaster_collection.json`.
4. Ejecutar las peticiones para verificar el funcionamiento de la API REST.

## Respuestas esperadas

- **200 OK** para consultas exitosas.
- **201 Created** para creación de registros.
- **200 OK** o **204 No Content** para eliminación de registros.