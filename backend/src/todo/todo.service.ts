import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoCreateInput, TodoCreateOutput } from './dto/todo-create.dto';
import { TodoDeleteOutput } from './dto/todo-delete.dto';
import { TodoUpdateInput, TodoUpdateOutput } from './dto/todo-update.dto';
import { Todo } from './models/todo.model';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async todoCreate(input: TodoCreateInput): Promise<TodoCreateOutput> {
    const newTodo = this.todoRepository.create(input);
    const todo = await this.todoRepository.save(newTodo);
    return { todo };
  }

  async todoUpdate(
    todoId: Todo['id'],
    input: TodoUpdateInput,
  ): Promise<TodoUpdateOutput> {
    const todo = await this.todoRepository.findOneByOrFail({ id: todoId });
    todo.title = input.title;
    todo.description = input.description;
    await todo.save();
    return { todo };
  }

  async todoDelete(todoId: Todo['id']): Promise<TodoDeleteOutput> {
    const todo = await this.todoRepository.findOneByOrFail({ id: todoId });
    await todo.remove();
    return { todoId };
  }

  async todosList(): Promise<Todo[]> {
    return this.todoRepository.find();
  }
}
