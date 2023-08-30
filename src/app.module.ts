import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { SummaryModule } from './summary/summary.module';


// we can use our middleware in useClass: CustomInterceptor
// import { CustomInterceptor } from "./custom.interceptor"
import { ReportModule } from './report/report.module';

// use this module for integrations between services and controllers
@Module({
  imports: [SummaryModule, ReportModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      // so we can use transform objects
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor
    }
  ],
})
export class AppModule { }
