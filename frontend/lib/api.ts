import { Departamento, Empleado, Tarea } from "./types";

const API = "http://localhost:3000";

interface EmpleadoData {
  nombre: string;
  apellido: string;
  email: string;
  id_dep: number;
}

interface UpdateEmpleadoData {
  nombre?: string;
  apellido?: string;
  email?: string;
  id_dep?: number;
}

interface TareaData {
  titulo: string;
  descripcion: string;
  estado: string;
  prioridad: string;
  fecha_limite: string;
  id_emp: number;
}

interface UpdateTareaData {
  titulo?: string;
  descripcion?: string;
  estado?: string;
  prioridad?: string;
  fecha_limite?: string;
  id_emp?: number;
}

// =====================================
// DEPARTAMENTOS
// =====================================

export async function getDepartamentos(): Promise<Departamento[]> {
  const res = await fetch(`${API}/departamentos`);

  if (!res.ok) {
    throw new Error("Error al obtener departamentos");
  }

  return res.json();
}

export async function createDepartamento(nombre: string) {
  const res = await fetch(`${API}/departamentos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nombre }),
  });

  if (!res.ok) {
    const mensaje = await res.text();
    throw new Error(mensaje || "Error al crear departamento");
  }

  return res.json();
}

export async function updateDepartamento(
  id: number,
  nombre: string,
) {
  const res = await fetch(`${API}/departamentos/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nombre }),
  });

  if (!res.ok) {
    const mensaje = await res.text();
    throw new Error(mensaje || "Error al actualizar departamento");
  }

  return res.json();
}

export async function deleteDepartamento(id: number) {
  const res = await fetch(`${API}/departamentos/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const mensaje = await res.text();
    throw new Error(mensaje || "Error al eliminar departamento");
  }
}

// =====================================
// EMPLEADOS
// =====================================

export async function getEmpleados(): Promise<Empleado[]> {
  const res = await fetch(`${API}/empleados`);

  if (!res.ok) {
    throw new Error("Error al obtener empleados");
  }

  return res.json();
}

export async function createEmpleado(data: EmpleadoData) {
  const res = await fetch(`${API}/empleados`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const mensaje = await res.text();
    throw new Error(mensaje || "Error al crear empleado");
  }

  return res.json();
}

export async function updateEmpleado(
  id: number,
  data: UpdateEmpleadoData,
) {
  const res = await fetch(`${API}/empleados/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const mensaje = await res.text();
    throw new Error(mensaje || "Error al actualizar empleado");
  }

  return res.json();
}

export async function deleteEmpleado(id: number) {
  const res = await fetch(`${API}/empleados/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const mensaje = await res.text();
    throw new Error(mensaje || "Error al eliminar empleado");
  }
}

// =====================================
// TAREAS
// =====================================

export async function getTareas(): Promise<Tarea[]> {
  const res = await fetch(`${API}/tareas`);

  if (!res.ok) {
    throw new Error("Error al obtener tareas");
  }

  return res.json();
}

export async function createTarea(data: TareaData) {
  const res = await fetch(`${API}/tareas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const mensaje = await res.text();
    throw new Error(mensaje || "Error al crear tarea");
  }

  return res.json();
}

export async function updateTarea(
  id: number,
  data: UpdateTareaData,
) {
  const res = await fetch(`${API}/tareas/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const mensaje = await res.text();
    throw new Error(mensaje || "Error al actualizar tarea");
  }

  return res.json();
}

export async function deleteTarea(id: number) {
  const res = await fetch(`${API}/tareas/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const mensaje = await res.text();
    throw new Error(mensaje || "Error al eliminar tarea");
  }
}