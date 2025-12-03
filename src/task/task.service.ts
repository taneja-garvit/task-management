import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task, TaskStatus } from './entities/task.entity';
import { User } from '../team/entities/user.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async createTask(description: string, due_date: Date): Promise<Task> {
        const task = this.taskRepository.create({
            description,
            due_date,
            status: TaskStatus.OPEN,
        });
        return this.taskRepository.save(task);
    }

    async assignTask(taskId: string, username: string): Promise<Task> {
        console.log(`Assigning task ${taskId} to ${username}`);
        const task = await this.taskRepository.findOne({ where: { _id: new ObjectId(taskId) } as any });
        if (!task) {
            console.log('Task not found');
            throw new NotFoundException('Task not found');
        }

        console.log(`Looking for user: ${username}`);
        const user = await this.userRepository.findOne({ where: { username } });
        console.log('User found:', user);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        task.assignee = { username: user.username };
        return this.taskRepository.save(task);
    }

    async updateTaskStatus(taskId: string, status: TaskStatus): Promise<Task> {
        console.log(`Updating task ${taskId} status to ${status}`);
        const task = await this.taskRepository.findOne({ where: { _id: new ObjectId(taskId) } as any });
        if (!task) {
            console.log('Task not found');
            throw new NotFoundException('Task not found');
        }
        task.status = status;
        return this.taskRepository.save(task);
    }

    async findAll(assigneeUsername?: string): Promise<Task[]> {
        if (assigneeUsername) {
            return this.taskRepository.find({ where: { 'assignee.username': assigneeUsername } as any });
        }
        return this.taskRepository.find();
    }
}
