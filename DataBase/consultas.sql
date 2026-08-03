-- consulta 1
-- objetivo mostrar cuantas tareas tiene cada empleado a su nombre

SELECT
e.id_emp,
CONCAT(e.nombre,' ',e.apellido) AS empleado,
COUNT(t.id_tarea) AS total_tareas

FROM empleados e

LEFT JOIN tareas t
ON e.id_emp=t.id_emp

GROUP BY
e.id_emp,
e.nombre,
e.apellido

ORDER BY total_tareas DESC;


-- consulta 2 
-- objetivo Mostrar la cantidad de tareas por departamento 

SELECT

d.nombre AS departamento,

COUNT(t.id_tarea) AS total_tareas,

SUM(
CASE
WHEN t.estado='Completado'
THEN 1
ELSE 0
END
) AS tareas_completadas

FROM departamentos d

LEFT JOIN empleados e
ON d.id_dep=e.id_dep

LEFT JOIN tareas t
ON e.id_emp=t.id_emp

GROUP BY d.nombre

ORDER BY total_tareas DESC;
