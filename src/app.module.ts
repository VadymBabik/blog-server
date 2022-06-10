import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from './post/post.module';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, 'static'),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: config.get<'aurora-data-api'>('TYPEORM_CONNECTION') as 'postgres',
        username: config.get<string>('TYPEORM_USERNAME'),
        host: config.get<string>('TYPEORM_HOST'),
        password: config.get<string>('TYPEORM_PASSWORD'),
        database: config.get<string>('TYPEORM_DATABASE'),
        port: config.get<number>('TYPEORM_PORT'),
        entities: [__dirname + `dist/**/*.entity{.ts, .js}`],
        synchronize: true,
        autoLoadEntities: true,
        logging: true,
      }),
    }),
    PostModule,
    FilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
