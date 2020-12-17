import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as option from './typeOrmModule.option';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: () => option.typeOrmModuleOptions,
        }),
    ],
})
export class DatabaseModule { }
