import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TareasController } from './tareas.controller';
import { TareasService } from './tareas.service';

import { Tarea } from './entities/tarea.entity';
import { Empleado } from 'src/empleados/entities/empleado.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      Tarea,
      Empleado,
    ]),
  ],
  controllers: [TareasController],
  providers: [TareasService],
})
export class TareasModule {}