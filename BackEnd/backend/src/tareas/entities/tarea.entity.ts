import { Entity,PrimaryGeneratedColumn,Column,ManyToOne,JoinColumn,} from 'typeorm';

import { Empleado } from 'src/empleados/entities/empleado.entity';

@Entity('tareas')
export class Tarea {

  @PrimaryGeneratedColumn()
  id_tarea: number;

  @Column()
  titulo: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  descripcion: string;

  @Column({
    type: 'enum',
    enum: ['Pendiente', 'En Proceso', 'Completado'],
    default: 'Pendiente',
  })
  estado: string;

  @Column({
    type: 'enum',
    enum: ['Baja', 'Media', 'Alta', 'Urgente'],
    default: 'Media',
  })
  prioridad: string;

  @Column({
    type: 'date',
  })
  fecha_limite: Date;

@ManyToOne(() => Empleado, (empleado) => empleado.tareas, {
  nullable: true,
  onDelete: 'SET NULL',
})
@JoinColumn({ name: 'id_emp' })
empleado: Empleado | null;
}