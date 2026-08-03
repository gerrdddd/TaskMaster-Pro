"use client";

import { useEffect, useState } from "react";
import {
  getEmpleados,
  getDepartamentos,
  createEmpleado,
  updateEmpleado,
  deleteEmpleado,
} from "@/lib/api";


interface Departamento{
  id_dep:number;
  nombre:string;
}


interface Empleado{

  id_emp:number;
  nombre:string;
  apellido:string;
  email:string;

  departamento?:{
    nombre:string;
  };

  id_dep:number;

}





export default function EmpleadosPage(){


const [empleados,setEmpleados]=useState<Empleado[]>([]);

const [departamentos,setDepartamentos]=useState<Departamento[]>([]);


const [nombre,setNombre]=useState("");
const [apellido,setApellido]=useState("");
const [email,setEmail]=useState("");
const [id_dep,setId_dep]=useState<number>(0);


const [editando,setEditando]=useState<number|null>(null);





async function cargar(){

 const data = await getEmpleados();

 setEmpleados(data);


 const deps = await getDepartamentos();

 setDepartamentos(deps);

}





useEffect(()=>{

 cargar();

},[]);






async function guardar(){


const datos={

 nombre,
 apellido,
 email,
 id_dep

};



if(editando){

 await updateEmpleado(
  editando,
  datos
 );


}else{


 await createEmpleado(
  datos
 );


}



setNombre("");
setApellido("");
setEmail("");
setId_dep(0);
setEditando(null);


cargar();


}







function editar(emp:Empleado){

 setEditando(emp.id_emp);

 setNombre(emp.nombre);

 setApellido(emp.apellido);

 setEmail(emp.email);


}




async function eliminar(id:number){

 if(!confirm("¿Eliminar empleado?"))
 return;


 await deleteEmpleado(id);


 cargar();


}





return (

<div>


<h1 className="
text-3xl
font-bold
text-black
mb-8
">
Empleados
</h1>





<div className="
bg-white
p-6
rounded-lg
shadow
mb-8
">


<input
className="border p-3 rounded w-full mb-3 text-black"
placeholder="Nombre"
value={nombre}
onChange={e=>setNombre(e.target.value)}
/>



<input
className="border p-3 rounded w-full mb-3 text-black"
placeholder="Apellido"
value={apellido}
onChange={e=>setApellido(e.target.value)}
/>



<input
className="border p-3 rounded w-full mb-3 text-black"
placeholder="Email"
value={email}
onChange={e=>setEmail(e.target.value)}
/>




<select

className="
border
p-3
rounded
w-full
mb-3
text-black
"

value={id_dep}

onChange={
e=>setId_dep(
Number(e.target.value)
)
}

>

<option value={0}>
Selecciona departamento
</option>


{
departamentos.map(dep=>(

<option
key={dep.id_dep}
value={dep.id_dep}
>

{dep.nombre}

</option>

))

}


</select>




<button

onClick={guardar}

className="
bg-slate-900
text-white
px-5
py-3
rounded
"

>

{
editando
?
"Actualizar"
:
"Guardar"
}

</button>



</div>









<table className="
w-full
bg-white
shadow
rounded-lg
">


<thead>

<tr className="bg-slate-200 text-black">


<th className="p-4">
ID
</th>


<th className="p-4">
Nombre
</th>


<th className="p-4">
Apellido
</th>


<th className="p-4">
Email
</th>


<th className="p-4">
Departamento
</th>


<th className="p-4">
Acciones
</th>


</tr>


</thead>



<tbody>


{
empleados.map(emp=>(


<tr
key={emp.id_emp}
className="border-t text-black"
>


<td className="p-4">
{emp.id_emp}
</td>


<td className="p-4">
{emp.nombre}
</td>


<td className="p-4">
{emp.apellido}
</td>


<td className="p-4">
{emp.email}
</td>


<td className="p-4">
{emp.departamento?.nombre}
</td>



<td className="p-4">


<button

onClick={()=>editar(emp)}

className="
bg-blue-600
text-white
px-3
py-2
rounded
mr-2
"

>

Editar

</button>



<button

onClick={()=>eliminar(emp.id_emp)}

className="
bg-red-600
text-white
px-3
py-2
rounded
"

>

Eliminar

</button>


</td>



</tr>


))

}


</tbody>


</table>


</div>

)


}