export class DepartamentoEntity {}
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Empleado } from 'src/empleados/entities/empleado.entity';
@Entity('departamentos')
export class Departamento {

  @PrimaryGeneratedColumn()
  id_dep: number;

  @Column({
    length: 100,
  })
  nombre: string;

  @OneToMany(() => Empleado, (empleado) => empleado.departamento)
  empleados: Empleado[];
}