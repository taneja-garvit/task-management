import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';

export enum TaskStatus {
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
}

@Entity()
export class Task {
    @ObjectIdColumn()
    id: ObjectId;

    @Column()
    description: string;

    @Column()
    due_date: Date;

    @Column({
        type: 'enum',
        enum: TaskStatus,
        default: TaskStatus.OPEN
    })
    status: TaskStatus;

    @Column()
    assignee: { username: string };
}
