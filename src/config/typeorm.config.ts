import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const typeOrmConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
  type: 'mongodb',
  url: configService.get<string>('MONGO_URI'),
  synchronize: true, 
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
});
