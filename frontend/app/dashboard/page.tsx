import KpiCard from "./components/KpiCard";

import {
  getDepartamentos,
  getEmpleados,
  getTareas,
} from "@/lib/api";

export default async function DashboardPage() {

  const departamentos = await getDepartamentos();
  const empleados = await getEmpleados();
  const tareas = await getTareas();

  const tareasPendientes = tareas.filter(
    (t) => t.estado === "Pendiente"
  );

  return (

    <div>

      <h1 className="text-3xl font-bold mb-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <KpiCard
          title="Departamentos"
          value={departamentos.length}
        />

        <KpiCard
          title="Empleados"
          value={empleados.length}
        />

        <KpiCard
          title="Tareas"
          value={tareas.length}
        />

        <KpiCard
          title="Pendientes"
          value={tareasPendientes.length}
        />

      </div>

    </div>

  );
}