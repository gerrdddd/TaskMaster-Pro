import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmpleadosController } from './empleados.controller';
import { EmpleadosService } from './empleados.service';

import { Empleado } from './entities/empleado.entity';
import { Departamento } from 'src/departamentos/entities/departamento.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Empleado,
      Departamento,
    ]),
  ],
  controllers: [EmpleadosController],
  providers: [EmpleadosService],
})
export class EmpleadosModule {}