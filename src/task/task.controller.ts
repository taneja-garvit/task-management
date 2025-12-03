import { Controller, Post, Body, Param, Get, Patch, Put, Query, UseGuards, BadRequestException } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskStatus } from './entities/task.entity';
import { AuthGuard } from '../auth/auth.guard';

@Controller('tasks')
@UseGuards(AuthGuard)
export class TaskController {
    constructor(private readonly taskService: TaskService) { }

    @Post()
    create(@Body('description') description: string, @Body('due_date') due_date: string) {
        return this.taskService.createTask(description, new Date(due_date));
    }

    @Put(':id/assign')
    assign(@Param('id') id: string, @Body('username') username: string) {
        if (!username) {
            throw new BadRequestException('Username is required');
        }
        return this.taskService.assignTask(id, username);
    }

    @Patch(':id')
    updateStatus(@Param('id') id: string, @Body('status') status: TaskStatus) {
        return this.taskService.updateTaskStatus(id, status);
    }

    @Get()
    findAll(@Query('assignee') assignee?: string) {
        return this.taskService.findAll(assignee);
    }
}
