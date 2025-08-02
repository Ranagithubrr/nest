import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Todo, TodoDocument } from './schema/todo.schema';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) { }

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const createdTodo = new this.todoModel(createTodoDto);
    return createdTodo.save();
  }


  async findAll() {
    const alltoDos = await this.todoModel.find().exec();
    return alltoDos;
  }

  async findOne(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`Invalid ID format: ${id}`);
    }
    const response = await this.todoModel.findById(id).exec();
    if (!response) {
      throw new NotFoundException(`Todo with id ${id} not found.`);
    }
    return response;
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`Invalid ID format: ${id}`);
    }
    const response = await this.todoModel.findByIdAndUpdate(
      id,
      updateTodoDto,
      { new: true }
    ).exec();
    if (!response) {
      throw new NotFoundException(`Todo with id ${id} not found.`);
    }
    return response;
  }

  async remove(id: string): Promise<string> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`Invalid ID format: ${id}`);
    }
    const response = await this.todoModel.findByIdAndDelete(id).exec();

    if (!response) {
      throw new NotFoundException(`Todo with id ${id} not found.`);
    }
    return `Todo has been deleted successfully.`;
  }
}
