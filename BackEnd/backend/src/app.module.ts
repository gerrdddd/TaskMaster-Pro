import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DepartamentosModule } from './departamentos/departamentos.module';
import { EmpleadosModule } from './empleados/empleados.module';
import { TareasModule } from './tareas/tareas.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root1234',
      database: 'task_manager',
      autoLoadEntities: true,
      synchronize: false,
    }),

    DepartamentosModule,
    EmpleadosModule,
    TareasModule,
  ],
})
export class AppModule {}