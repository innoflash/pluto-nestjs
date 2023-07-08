import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { UserRole } from '../../users/user-role';
import { Role } from '../../users/entities/role.entity';

export default class UserRoleSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const teachersPromise = await dataSource
      .getRepository(User)
      .find({ take: 10 })
      .then(teachers =>
        teachers.map(async teacher => {
          const teacherRole = await dataSource.getRepository(Role).findOne({
            where: { name: UserRole.TEACHER }
          });
          teacher.roles = [teacherRole];

          return dataSource.getRepository(User).save(teacher);
        })
      );

    const studentsPromise = await dataSource
      .getRepository(User)
      .find({ skip: 10 })
      .then(students =>
        students.map(async student => {
          const userRole = await dataSource.getRepository(Role).findOne({
            where: { name: UserRole.STUDENT }
          });
          student.roles = [userRole];

          return dataSource.getRepository(User).save(student);
        })
      );

    return Promise.all([...teachersPromise, ...studentsPromise]);
  }
}
