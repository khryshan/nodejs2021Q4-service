import { Connection } from 'typeorm';
import { User } from './entities/User';

export const populateDB = async (connection: Connection) => {
  const user = new User();
  user.id = '891220f1-0000-45cf-8a9c-3fb98b1392c7'
  user.login = 'admin';
  user.name = 'admin';
  user.password = '$2a$10$Nq4o6h1Za3TRwTIXUH9houWHNycEO2zVCbg5wQhUPJdFiBOxtqKPm';

  await connection.manager.save(user);
}