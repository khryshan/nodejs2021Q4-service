import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  HttpException,
  HttpStatus,
  UseGuards
} from '@nestjs/common';
import { UsersService } from './users.service';
import { TasksService } from '../tasks/tasks.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {AuthGuard} from '../auth/auth.guard';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly tasksService: TasksService
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const currentUser = await this.usersService.findOne(id);
    if (currentUser) {
      return currentUser;
    }
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const updatedUser = await this.usersService.update(id, updateUserDto);
    if (updatedUser) {
      return updatedUser;
    }
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {

    const result = await this.usersService.remove(id);
    
    await this.tasksService.setDefaultUserId(id);

    if(result) {
      return;
    }
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }
}
