import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dbModule } from './db/database.module'

@Module({
  imports: [
    dbModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
