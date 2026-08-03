import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';


import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { Empleado } from './entities/empleado.entity';
import { Departamento } from 'src/departamentos/entities/departamento.entity';

@Injectable()
export class EmpleadosService {

  constructor(

    @InjectRepository(Empleado)
    private empleadoRepository: Repository<Empleado>,

    @InjectRepository(Departamento)
    private departamentoRepository: Repository<Departamento>,

  ) {}

  async create(dto: CreateEmpleadoDto) {

    const departamento = await this.departamentoRepository.findOne({
      where: { id_dep: dto.id_dep },
    });

    if (!departamento) {
      throw new NotFoundException('Departamento no encontrado');
    }

    const empleado = this.empleadoRepository.create({
      nombre: dto.nombre,
      apellido: dto.apellido,
      email: dto.email,
      departamento,
    });

    return await this.empleadoRepository.save(empleado);
  }

  async findAll() {
    return await this.empleadoRepository.find({
      relations: {
  departamento: true,
},
    });
  }

async findOne(id: number) {

  const empleado = await this.empleadoRepository.findOne({
    where: { id_emp: id },
    relations: {
      departamento: true,
    },
  });

  if (!empleado) {
    throw new NotFoundException('Empleado no encontrado');
  }

  return empleado;
}

  async update(id: number, dto: UpdateEmpleadoDto) {

    const empleado = await this.findOne(id);

    if (dto.nombre) empleado.nombre = dto.nombre;
    if (dto.apellido) empleado.apellido = dto.apellido;
    if (dto.email) empleado.email = dto.email;

    if (dto.id_dep) {

      const departamento = await this.departamentoRepository.findOne({
        where: { id_dep: dto.id_dep },
      });

      if (!departamento) {
        throw new NotFoundException('Departamento no encontrado');
      }

      empleado.departamento = departamento;
    }

    return await this.empleadoRepository.save(empleado);
  }

  async remove(id: number) {

    const empleado = await this.findOne(id);

    return await this.empleadoRepository.remove(empleado);
  }

}