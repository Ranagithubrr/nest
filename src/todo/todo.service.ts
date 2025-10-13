import { Injectable, Param } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodoService {
    constructor() { }
    getAllTodo() {
        return 'This action returns all todos';
    }
    deleteTodo(id: string) {
        return `This action deletes a todo with id: ${id}`;
    }
    createTodo(createTodoDto: CreateTodoDto) {
        return createTodoDto;
    }
}
