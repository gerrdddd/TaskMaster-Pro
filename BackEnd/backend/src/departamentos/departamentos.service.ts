import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateDepartamentoDto } from './dto/create-departamento.dto';
import { UpdateDepartamentoDto } from './dto/update-departamento.dto';
import { Departamento } from './entities/departamento.entity';

@Injectable()
export class DepartamentosService {
  constructor(
    @InjectRepository(Departamento)
    private readonly departamentoRepository: Repository<Departamento>,
  ) {}

  async create(createDepartamentoDto: CreateDepartamentoDto) {
    const departamento = this.departamentoRepository.create(createDepartamentoDto);
    return await this.departamentoRepository.save(departamento);
  }

  async findAll() {
    return await this.departamentoRepository.find();
  }

  async findOne(id: number) {
    const departamento = await this.departamentoRepository.findOne({
      where: { id_dep: id },
    });

    if (!departamento) {
      throw new NotFoundException('Departamento no encontrado');
    }

    return departamento;
  }

  async remove(id: number) {
    const departamento = await this.findOne(id);
    return await this.departamentoRepository.remove(departamento);
  }


  async update(id: number, updateDepartamentoDto: UpdateDepartamentoDto) {
  const departamento = await this.findOne(id);

  Object.assign(departamento, updateDepartamentoDto);

  return await this.departamentoRepository.save(departamento);
}


  
}