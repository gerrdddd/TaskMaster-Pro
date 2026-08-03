-- ============================================
-- Base de Datos
-- Proyecto Final - Bases de Datos Avanzadas
-- Sistema de Gestión de Tareas
-- ============================================

DROP DATABASE IF EXISTS task_manager;

CREATE DATABASE task_manager;

USE task_manager;

-- ==========================
-- Tabla Departamentos
-- ==========================

CREATE TABLE departamentos (
    id_dep INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

-- ==========================
-- Tabla Empleados
-- ==========================

CREATE TABLE empleados (
    id_emp INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    id_dep INT NOT NULL,

    CONSTRAINT fk_empleado_departamento
    FOREIGN KEY (id_dep)
    REFERENCES departamentos(id_dep)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
);

-- ==========================
-- Tabla Tareas
-- ==========================

CREATE TABLE tareas (
    id_tarea INT AUTO_INCREMENT PRIMARY KEY,

    titulo VARCHAR(150) NOT NULL,

    descripcion TEXT,

    estado ENUM(
        'Pendiente',
        'En Proceso',
        'Completado'
    ) DEFAULT 'Pendiente',

    prioridad ENUM(
        'Baja',
        'Media',
        'Alta',
        'Urgente'
    ) DEFAULT 'Media',

    fecha_limite DATE,

    id_emp INT NOT NULL,

    CONSTRAINT fk_tarea_empleado
    FOREIGN KEY(id_emp)
    REFERENCES empleados(id_emp)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
);
