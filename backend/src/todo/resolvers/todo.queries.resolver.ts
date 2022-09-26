import { Query, Resolver } from '@nestjs/graphql';
import { Todo } from '../models/todo.model';
import { TodoService } from '../todo.service';

@Resolver(Todo)
export class TodoQueriesResolver {
  constructor(private readonly todoService: TodoService) {}
  @Query(() => [Todo])
  async todosList() {
    return this.todoService.todosList();
  }
}
