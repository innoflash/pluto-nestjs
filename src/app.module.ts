import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { PhotosModule } from './photos/photos.module';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { MessagesModule } from './messages/messages.module';
import { SocialMediaModule } from './social-media/social-media.module';
import { TestimoniesModule } from './testimonies/testimonies.module';
import { UsersSubscriber } from './users/users-subscriber';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    DatabaseModule,
    UsersModule,
    ProjectsModule,
    AuthenticationModule,
    PhotosModule,
    TasksModule,
    MessagesModule,
    SocialMediaModule,
    TestimoniesModule
  ],
  controllers: [],
  providers: [
    UsersSubscriber
  ]
})
export class AppModule {
}
