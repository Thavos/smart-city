import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { join } from 'path';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';

import { UserModule } from './database/user/user.module';
import { TechnicianModule } from './database/technician/technician.module';
import { ManagerModule } from './database/manager/manager.module';
import { TicketModule } from './database/ticket/ticket.module';
import { CommentModule } from './database/comment/comment.module';
import { ServicerequestModule } from './database/servicerequest/servicerequest.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '../client/build'),
      exclude: ['/api/(.*)', '/graphql/(.*)'],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      context: ({ req }) => ({ req }),
      cors: { origin: true, credentials: true },
      playground: true,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/types/graphql.ts'),
        outputAs: 'class',
      },
    }),
    UserModule,
    TechnicianModule,
    ManagerModule,
    TicketModule,
    CommentModule,
    ServicerequestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
