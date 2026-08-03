export class EmpleadoEntity {}
import {Entity,PrimaryGeneratedColumn,Column,ManyToOne,OneToMany,JoinColumn,} from 'typeorm';

import { Departamento } from 'src/departamentos/entities/departamento.entity';
import { Tarea } from 'src/tareas/entities/tarea.entity';


@Entity('empleados')
export class Empleado {

  @PrimaryGeneratedColumn()
  id_emp: number;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column({ unique: true,})
  email: string;

  @ManyToOne(() => Departamento, (departamento) => departamento.empleados)
  @JoinColumn({ name: 'id_dep' })
  departamento: Departamento;

  @OneToMany(() => Tarea, (tarea) => tarea.empleado)
  tareas: Tarea[];
}