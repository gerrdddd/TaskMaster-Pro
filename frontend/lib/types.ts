export interface Departamento {
  id_dep: number;
  nombre: string;
}

export interface Empleado {
  id_emp: number;
  nombre: string;
  apellido: string;
  email: string;
  departamento: Departamento;
}

export interface Tarea {
  id_tarea: number;
  titulo: string;
  descripcion?: string;
  estado: "Pendiente" | "En Proceso" | "Completado";
  prioridad: "Baja" | "Media" | "Alta" | "Urgente";
  fecha_limite: string;
  empleado: Empleado | null;
}