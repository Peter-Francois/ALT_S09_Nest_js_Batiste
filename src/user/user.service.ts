import { Injectable } from '@nestjs/common';
import { UserInterface } from './Interface/user.interface';

@Injectable()
export class UserService {
  getUsers(): UserInterface[] {
    return [{ firstName: 'Peter' }];
  }
}
