"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  createTarea,
  deleteTarea,
  getEmpleados,
  getTareas,
  updateTarea,
} from "@/lib/api";

interface Empleado {
  id_emp: number;
  nombre: string;
  apellido: string;
}

interface Tarea {
  id_tarea: number;
  titulo: string;
  descripcion: string;
  estado: string;
  prioridad: string;
  fecha_limite: string;
  id_emp?: number | null;
  empleado?: Empleado | null;
}

interface FormularioTarea {
  titulo: string;
  descripcion: string;
  estado: string;
  prioridad: string;
  fecha_limite: string;
  id_emp: number;
}

const formularioInicial: FormularioTarea = {
  titulo: "",
  descripcion: "",
  estado: "Pendiente",
  prioridad: "Media",
  fecha_limite: "",
  id_emp: 0,
};

export default function TareasPage() {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [empleados, setEmpleados] = useState<Empleado[]>([]);

  const [formulario, setFormulario] =
    useState<FormularioTarea>(formularioInicial);

  const [idEditando, setIdEditando] = useState<number | null>(null);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  async function cargarDatos() {
    try {
      setCargando(true);
      setError("");

      const [tareasData, empleadosData] = await Promise.all([
        getTareas(),
        getEmpleados(),
      ]);

      setTareas(tareasData as Tarea[]);
      setEmpleados(empleadosData as Empleado[]);
    } catch (error) {
      console.error("Error al cargar datos:", error);
      setError(
        "No se pudieron cargar las tareas. Revisa que el backend esté encendido.",
      );
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    void cargarDatos();
  }, []);

  function cambiarCampo(
    campo: keyof FormularioTarea,
    valor: string | number,
  ) {
    setFormulario((formularioActual) => ({
      ...formularioActual,
      [campo]: valor,
    }));
  }

  function limpiarFormulario() {
    setFormulario(formularioInicial);
    setIdEditando(null);
    setError("");
  }

  async function guardarTarea(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    if (!formulario.titulo.trim()) {
      setError("Escribe el título de la tarea.");
      return;
    }

    if (!formulario.descripcion.trim()) {
      setError("Escribe la descripción.");
      return;
    }

    if (!formulario.fecha_limite) {
      setError("Selecciona una fecha límite.");
      return;
    }

    if (formulario.id_emp === 0) {
      setError("Selecciona un empleado.");
      return;
    }

    const datos = {
      titulo: formulario.titulo.trim(),
      descripcion: formulario.descripcion.trim(),
      estado: formulario.estado,
      prioridad: formulario.prioridad,
      fecha_limite: formulario.fecha_limite,
      id_emp: formulario.id_emp,
    };

    try {
      setGuardando(true);
      setError("");

      if (idEditando !== null) {
        await updateTarea(idEditando, datos);
      } else {
        await createTarea(datos);
      }

      limpiarFormulario();
      await cargarDatos();
    } catch (error) {
      console.error("Error guardando tarea:", error);
      setError(
        idEditando !== null
          ? "No se pudo actualizar la tarea."
          : "No se pudo crear la tarea.",
      );
    } finally {
      setGuardando(false);
    }
  }

  function editarTarea(tarea: Tarea) {
    const idEmpleado =
      tarea.id_emp ??
      tarea.empleado?.id_emp ??
      0;

    setIdEditando(tarea.id_tarea);

    setFormulario({
      titulo: tarea.titulo ?? "",
      descripcion: tarea.descripcion ?? "",
      estado: tarea.estado ?? "Pendiente",
      prioridad: tarea.prioridad ?? "Media",
      fecha_limite: formatearFechaInput(tarea.fecha_limite),
      id_emp: idEmpleado,
    });

    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function eliminarTarea(id: number) {
    const confirmar = window.confirm(
      "¿Seguro que quieres eliminar esta tarea?",
    );

    if (!confirmar) {
      return;
    }

    try {
      setError("");

      await deleteTarea(id);

      setTareas((tareasActuales) =>
        tareasActuales.filter((tarea) => tarea.id_tarea !== id),
      );

      if (idEditando === id) {
        limpiarFormulario();
      }
    } catch (error) {
      console.error("Error eliminando tarea:", error);
      setError("No se pudo eliminar la tarea.");
    }
  }

  return (
    <div className="text-black">
      <h1 className="mb-8 text-3xl font-bold">
        Tareas
      </h1>

      <form
        onSubmit={guardarTarea}
        className="mb-8 rounded-xl bg-white p-6 shadow"
      >
        <h2 className="mb-5 text-xl font-bold">
          {idEditando !== null
            ? "Editar tarea"
            : "Nueva tarea"}
        </h2>

        {error && (
          <div className="mb-5 rounded-lg border border-red-300 bg-red-50 p-3 text-red-700">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label
              htmlFor="titulo"
              className="mb-2 block font-semibold"
            >
              Título
            </label>

            <input
              id="titulo"
              type="text"
              value={formulario.titulo}
              onChange={(evento) =>
                cambiarCampo("titulo", evento.target.value)
              }
              placeholder="Título de la tarea"
              className="w-full rounded-lg border border-gray-300 bg-white p-3 text-black"
            />
          </div>

          <div>
            <label
              htmlFor="empleado"
              className="mb-2 block font-semibold"
            >
              Empleado
            </label>

            <select
              id="empleado"
              value={formulario.id_emp}
              onChange={(evento) =>
                cambiarCampo(
                  "id_emp",
                  Number(evento.target.value),
                )
              }
              className="w-full rounded-lg border border-gray-300 bg-white p-3 text-black"
            >
              <option value={0}>
                Selecciona un empleado
              </option>

              {empleados.map((empleado) => (
                <option
                  key={empleado.id_emp}
                  value={empleado.id_emp}
                >
                  {empleado.nombre} {empleado.apellido}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="descripcion"
              className="mb-2 block font-semibold"
            >
              Descripción
            </label>

            <textarea
              id="descripcion"
              rows={4}
              value={formulario.descripcion}
              onChange={(evento) =>
                cambiarCampo(
                  "descripcion",
                  evento.target.value,
                )
              }
              placeholder="Descripción de la tarea"
              className="w-full resize-none rounded-lg border border-gray-300 bg-white p-3 text-black"
            />
          </div>

          <div>
            <label
              htmlFor="estado"
              className="mb-2 block font-semibold"
            >
              Estado
            </label>

            <select
              id="estado"
              value={formulario.estado}
              onChange={(evento) =>
                cambiarCampo("estado", evento.target.value)
              }
              className="w-full rounded-lg border border-gray-300 bg-white p-3 text-black"
            >
              <option value="Pendiente">
                Pendiente
              </option>

              <option value="En Proceso">
                En Proceso
              </option>

              <option value="Completado">
                Completado
              </option>
            </select>
          </div>

          <div>
            <label
              htmlFor="prioridad"
              className="mb-2 block font-semibold"
            >
              Prioridad
            </label>

            <select
              id="prioridad"
              value={formulario.prioridad}
              onChange={(evento) =>
                cambiarCampo(
                  "prioridad",
                  evento.target.value,
                )
              }
              className="w-full rounded-lg border border-gray-300 bg-white p-3 text-black"
            >
              <option value="Baja">Baja</option>
              <option value="Media">Media</option>
              <option value="Alta">Alta</option>
              <option value="Urgente">Urgente</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="fecha_limite"
              className="mb-2 block font-semibold"
            >
              Fecha límite
            </label>

            <input
              id="fecha_limite"
              type="date"
              value={formulario.fecha_limite}
              onChange={(evento) =>
                cambiarCampo(
                  "fecha_limite",
                  evento.target.value,
                )
              }
              className="w-full rounded-lg border border-gray-300 bg-white p-3 text-black"
            />
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="submit"
            disabled={guardando}
            className="rounded-lg bg-slate-900 px-6 py-3 font-semibold text-white hover:bg-slate-700 disabled:opacity-60"
          >
            {guardando
              ? "Guardando..."
              : idEditando !== null
                ? "Actualizar tarea"
                : "Crear tarea"}
          </button>

          {idEditando !== null && (
            <button
              type="button"
              onClick={limpiarFormulario}
              className="rounded-lg bg-gray-500 px-6 py-3 font-semibold text-white hover:bg-gray-600"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      <div className="overflow-hidden rounded-xl bg-white shadow">
        {cargando ? (
          <p className="p-6">
            Cargando tareas...
          </p>
        ) : tareas.length === 0 ? (
          <p className="p-6">
            No hay tareas registradas.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px]">
              <thead>
                <tr className="bg-slate-200">
                  <th className="p-4 text-left">ID</th>
                  <th className="p-4 text-left">Título</th>
                  <th className="p-4 text-left">Descripción</th>
                  <th className="p-4 text-left">Estado</th>
                  <th className="p-4 text-left">Prioridad</th>
                  <th className="p-4 text-left">Fecha</th>
                  <th className="p-4 text-left">Empleado</th>
                  <th className="p-4 text-center">
                    Acciones
                  </th>
                </tr>
              </thead>

              <tbody>
                {tareas.map((tarea) => (
                  <tr
                    key={tarea.id_tarea}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="p-4">
                      {tarea.id_tarea}
                    </td>

                    <td className="p-4 font-semibold">
                      {tarea.titulo}
                    </td>

                    <td className="max-w-64 p-4">
                      {tarea.descripcion}
                    </td>

                    <td className="p-4">
                      <span
                        className={`rounded-full px-3 py-1 text-sm font-semibold ${colorEstado(
                          tarea.estado,
                        )}`}
                      >
                        {tarea.estado}
                      </span>
                    </td>

                    <td className="p-4">
                      <span
                        className={`rounded-full px-3 py-1 text-sm font-semibold ${colorPrioridad(
                          tarea.prioridad,
                        )}`}
                      >
                        {tarea.prioridad}
                      </span>
                    </td>

                    <td className="p-4">
                      {formatearFechaVisible(
                        tarea.fecha_limite,
                      )}
                    </td>

                    <td className="p-4">
                      {tarea.empleado
                        ? `${tarea.empleado.nombre} ${tarea.empleado.apellido}`
                        : "Sin asignar"}
                    </td>

                    <td className="p-4">
                      <div className="flex justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => editarTarea(tarea)}
                          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                        >
                          Editar
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            eliminarTarea(tarea.id_tarea)
                          }
                          className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function formatearFechaInput(
  fecha: string | null | undefined,
) {
  if (!fecha) {
    return "";
  }

  return fecha.substring(0, 10);
}

function formatearFechaVisible(
  fecha: string | null | undefined,
) {
  if (!fecha) {
    return "Sin fecha";
  }

  const fechaLimpia = fecha.substring(0, 10);
  const partes = fechaLimpia.split("-");

  if (partes.length !== 3) {
    return fecha;
  }

  return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

function colorEstado(estado: string) {
  switch (estado.toLowerCase()) {
    case "completado":
      return "bg-green-100 text-green-800";

    case "en proceso":
      return "bg-blue-100 text-blue-800";

    default:
      return "bg-yellow-100 text-yellow-800";
  }
}

function colorPrioridad(prioridad: string) {
  switch (prioridad.toLowerCase()) {
    case "urgente":
      return "bg-red-200 text-red-900";

    case "alta":
      return "bg-red-100 text-red-800";

    case "baja":
      return "bg-green-100 text-green-800";

    default:
      return "bg-orange-100 text-orange-800";
  }
}