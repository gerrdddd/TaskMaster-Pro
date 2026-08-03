USE task_manager;

-- ==========================
-- Departamentos
-- ==========================

INSERT INTO departamentos(nombre)
VALUES
('Recursos Humanos'),
('Tecnologías de la Información'),
('Ventas'),
('Marketing'),
('Contabilidad');

-- ==========================
-- Empleados
-- ==========================

INSERT INTO empleados(nombre,apellido,email,id_dep)
VALUES
('Juan','Pérez','juan@empresa.com',1),
('Ana','López','ana@empresa.com',2),
('Carlos','Martínez','carlos@empresa.com',2),
('Laura','Ramírez','laura@empresa.com',3),
('Pedro','Gómez','pedro@empresa.com',3),
('Sofía','Hernández','sofia@empresa.com',4),
('Miguel','Torres','miguel@empresa.com',5),
('Andrea','Ruiz','andrea@empresa.com',1),
('Diego','Flores','diego@empresa.com',2),
('Valeria','Castro','valeria@empresa.com',4);

-- ==========================
-- Tareas
-- ==========================

INSERT INTO tareas
(titulo,descripcion,estado,prioridad,fecha_limite,id_emp)
VALUES

('Configurar servidor',
'Instalar servidor de producción',
'Pendiente',
'Alta',
'2026-08-20',
2),

('Actualizar página web',
'Cambiar información del sitio',
'En Proceso',
'Media',
'2026-08-18',
3),

('Revisión de nómina',
'Verificar pagos',
'Completado',
'Alta',
'2026-08-05',
1),

('Campaña Facebook',
'Crear anuncios',
'Pendiente',
'Media',
'2026-08-25',
6),

('Inventario',
'Actualizar registros',
'Completado',
'Baja',
'2026-08-03',
7),

('Prospección clientes',
'Llamadas de seguimiento',
'En Proceso',
'Alta',
'2026-08-12',
5),

('Respaldo BD',
'Backup semanal',
'Pendiente',
'Urgente',
'2026-08-06',
2),

('Diseño Banner',
'Banner principal',
'Completado',
'Media',
'2026-08-08',
10),

('Actualizar Antivirus',
'Todos los equipos',
'Pendiente',
'Alta',
'2026-08-15',
9),

('Revisión Facturas',
'Facturas del mes',
'En Proceso',
'Media',
'2026-08-14',
7),

('Crear usuarios',
'Altas de empleados',
'Pendiente',
'Media',
'2026-08-19',
2),

('Optimizar consultas SQL',
'Mejorar rendimiento',
'En Proceso',
'Urgente',
'2026-08-11',
3),

('Capacitación',
'Curso de seguridad',
'Pendiente',
'Baja',
'2026-08-30',
8),

('Actualizar CRM',
'Nuevos módulos',
'Completado',
'Alta',
'2026-08-02',
4),

('Reporte mensual',
'Reporte agosto',
'Pendiente',
'Media',
'2026-08-31',
5),

('Cambiar impresora',
'Instalación oficina',
'Completado',
'Baja',
'2026-08-01',
1),

('Auditoría',
'Proceso interno',
'Pendiente',
'Alta',
'2026-08-28',
7),

('Corrección de errores',
'Sistema interno',
'En Proceso',
'Urgente',
'2026-08-10',
9),

('Actualizar inventario',
'Equipos nuevos',
'Pendiente',
'Media',
'2026-08-21',
10),

('Reunión semanal',
'Seguimiento proyectos',
'Completado',
'Baja',
'2026-08-04',
6);
