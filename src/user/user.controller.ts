import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { UserInterface } from './Interface/user.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(): UserInterface[] {
    return this.userService.getUsers();
  }
}
