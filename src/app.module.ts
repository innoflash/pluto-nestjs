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
import { TestimoniesModule } from './testimonies/testimonies.module';
import { UsersSubscriber } from '@pluto/users/users-subscriber';

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
    RatingsModule,
    TestimoniesModule
  ],
  controllers: [],
  providers: [
    UsersSubscriber
  ]
})
export class AppModule {
}
