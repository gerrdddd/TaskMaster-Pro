import Link from "next/link";

const menuItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: "📊",
  },
  {
    name: "Departamentos",
    path: "/dashboard/departamentos",
    icon: "🏢",
  },
  {
    name: "Empleados",
    path: "/dashboard/empleados",
    icon: "👥",
  },
  {
    name: "Tareas",
    path: "/dashboard/tareas",
    icon: "✅",
  },
];

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-900 p-6">

      <h1 className="text-2xl font-bold mb-10 text-white">
        Task Manager
      </h1>

      <nav className="space-y-3">

        {menuItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className="
              flex
              items-center
              gap-3
              rounded-lg
              px-4
              py-3
              text-white
              hover:bg-slate-700
              transition
            "
          >

            <span>{item.icon}</span>

            <span>
              {item.name}
            </span>

          </Link>
        ))}

      </nav>

    </aside>
  );
}