"use client";

import { useEffect, useState } from "react";
import {
  getDepartamentos,
  createDepartamento,
  updateDepartamento,
  deleteDepartamento,
} from "@/lib/api";


interface Departamento {
  id_dep: number;
  nombre: string;
}


export default function DepartamentosPage() {

  const [departamentos, setDepartamentos] = useState<Departamento[]>([]);
  const [nombre, setNombre] = useState("");
  const [editando, setEditando] = useState<number | null>(null);
  const [cargando, setCargando] = useState(true);


  async function cargarDepartamentos() {

    try {

      setCargando(true);

      const data = await getDepartamentos();

      console.log("Departamentos:", data);

      setDepartamentos(data);

    } catch (error) {

      console.error(
        "Error cargando departamentos:",
        error
      );

    } finally {

      setCargando(false);

    }

  }



  useEffect(() => {

    cargarDepartamentos();

  }, []);




  async function guardarDepartamento() {

    if (!nombre.trim()) {
      return;
    }


    try {


      if (editando !== null) {


        await updateDepartamento(
          editando,
          nombre
        );


      } else {


        await createDepartamento(
          nombre
        );


      }


      setNombre("");

      setEditando(null);


      await cargarDepartamentos();


    } catch(error) {


      console.error(
        "Error guardando departamento:",
        error
      );


    }

  }





  async function eliminarDepartamento(
    id:number
  ) {


    const confirmar = window.confirm(
      "¿Seguro que quieres eliminar este departamento?"
    );


    if(!confirmar) return;



    try {


      await deleteDepartamento(id);


      await cargarDepartamentos();



    } catch(error){


      console.error(
        "Error eliminando:",
        error
      );


    }


  }






  function editarDepartamento(
    departamento:Departamento
  ){


    setEditando(
      departamento.id_dep
    );


    setNombre(
      departamento.nombre
    );


  }







  return (

    <div>


      <h1 className="
      text-3xl
      font-bold
      mb-8
      text-black
      ">
        Departamentos
      </h1>





      <div className="
      bg-white
      shadow
      rounded-lg
      p-6
      mb-8
      ">



        <h2 className="
        text-xl
        font-bold
        text-black
        mb-4
        ">

          {
            editando !== null
            ?
            "Editar departamento"
            :
            "Nuevo departamento"
          }

        </h2>





        <input

          type="text"

          value={nombre}

          onChange={
            (e)=>setNombre(e.target.value)
          }

          placeholder="Nombre del departamento"

          className="
          w-full
          border
          rounded-lg
          p-3
          text-black
          mb-4
          "

        />





        <button

          onClick={
            guardarDepartamento
          }

          className="
          bg-slate-900
          text-white
          px-6
          py-3
          rounded-lg
          hover:bg-slate-700
          "

        >

          {
            editando !== null
            ?
            "Actualizar"
            :
            "Guardar"
          }


        </button>




        {
          editando !== null && (

            <button

              onClick={()=>{
                setEditando(null);
                setNombre("");
              }}

              className="
              ml-3
              bg-gray-500
              text-white
              px-6
              py-3
              rounded-lg
              "

            >

              Cancelar

            </button>

          )
        }



      </div>








      <div className="
      bg-white
      shadow
      rounded-lg
      overflow-hidden
      ">


      {
        cargando ?

        (

          <p className="
          p-6
          text-black
          ">
            Cargando departamentos...
          </p>

        )

        :

        (

        <table className="w-full">


          <thead>


            <tr className="bg-slate-200">


              <th className="
              p-4
              text-left
              text-black
              ">
                ID
              </th>


              <th className="
              p-4
              text-left
              text-black
              ">
                Nombre
              </th>


              <th className="
              p-4
              text-left
              text-black
              ">
                Acciones
              </th>


            </tr>


          </thead>





          <tbody>


          {
            departamentos.map((dep)=>(


              <tr
                key={dep.id_dep}
                className="border-t"
              >


                <td className="
                p-4
                text-black
                ">
                  {dep.id_dep}
                </td>




                <td className="
                p-4
                text-black
                ">
                  {dep.nombre}
                </td>





                <td className="
                p-4
                ">


                  <button

                    onClick={()=>
                      editarDepartamento(dep)
                    }

                    className="
                    bg-blue-600
                    text-white
                    px-4
                    py-2
                    rounded-lg
                    mr-3
                    "

                  >

                    Editar

                  </button>





                  <button

                    onClick={()=>
                      eliminarDepartamento(
                        dep.id_dep
                      )
                    }

                    className="
                    bg-red-600
                    text-white
                    px-4
                    py-2
                    rounded-lg
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

        )

      }



      </div>




    </div>


  );

}