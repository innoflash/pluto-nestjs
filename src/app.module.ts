import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '@pluto/users/users.module';
import { ProjectsModule } from '@pluto/projects/projects.module';
import { AuthenticationModule } from '@pluto/authentication/authentication.module';
import { PhotosModule } from '@pluto/photos/photos.module';
import { TasksModule } from '@pluto/tasks/tasks.module';
import { MessagesModule } from '@pluto/messages/messages.module';
import { SocialMediaModule } from '@pluto/social-media/social-media.module';
import { RatingsModule } from '@pluto/ratings/ratings.module';

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
    RatingsModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {
}
