import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Tarea } from './entities/tarea.entity';
import { Empleado } from 'src/empleados/entities/empleado.entity';

import { CreateTareaDto } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea.dto';


@Injectable()
export class TareasService {

  constructor(

    @InjectRepository(Tarea)
    private tareaRepository: Repository<Tarea>,

    @InjectRepository(Empleado)
    private empleadoRepository: Repository<Empleado>,

  ) {}


  async create(dto: CreateTareaDto) {

    const empleado = await this.empleadoRepository.findOne({
      where: {
        id_emp: dto.id_emp,
      },
    });


    if (!empleado) {
      throw new NotFoundException('Empleado no encontrado');
    }


    const tarea = this.tareaRepository.create({
      titulo: dto.titulo,
      descripcion: dto.descripcion,
      estado: dto.estado,
      prioridad: dto.prioridad,
      fecha_limite: new Date(dto.fecha_limite),
      empleado,
    });


    return await this.tareaRepository.save(tarea);
  }


  async findAll() {

    return await this.tareaRepository.find({
      relations: {
        empleado: true,
      },
    });

  }


  async findOne(id: number) {

    const tarea = await this.tareaRepository.findOne({
      where: {
        id_tarea: id,
      },
      relations: {
        empleado: true,
      },
    });


    if (!tarea) {
      throw new NotFoundException('Tarea no encontrada');
    }


    return tarea;
  }


  async update(id: number, dto: UpdateTareaDto) {

    const tarea = await this.findOne(id);


    if (dto.titulo)
      tarea.titulo = dto.titulo;

    if (dto.descripcion)
      tarea.descripcion = dto.descripcion;

    if (dto.estado)
      tarea.estado = dto.estado;

    if (dto.prioridad)
      tarea.prioridad = dto.prioridad;

    if (dto.fecha_limite)
      tarea.fecha_limite = new Date(dto.fecha_limite);


    if (dto.id_emp) {

      const empleado = await this.empleadoRepository.findOne({
        where:{
          id_emp: dto.id_emp,
        },
      });


      if(!empleado){
        throw new NotFoundException('Empleado no encontrado');
      }


      tarea.empleado = empleado;
    }


    return await this.tareaRepository.save(tarea);
  }


  async remove(id:number){

    const tarea = await this.findOne(id);

    return await this.tareaRepository.remove(tarea);

  }

}