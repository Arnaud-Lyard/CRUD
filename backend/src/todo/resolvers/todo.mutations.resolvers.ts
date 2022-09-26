import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { TodoCreateInput, TodoCreateOutput } from '../dto/todo-create.dto';
import { TodoDeleteOutput } from '../dto/todo-delete.dto';
import { TodoUpdateInput, TodoUpdateOutput } from '../dto/todo-update.dto';
import { Todo } from '../models/todo.model';
import { TodoService } from '../todo.service';

@Resolver(Todo)
export class TodoMutationsResolver {
  constructor(private readonly todoService: TodoService) {}

  @Mutation(() => TodoCreateOutput)
  async todoCreate(@Args('input') input: TodoCreateInput) {
    return this.todoService.todoCreate(input);
  }

  @Mutation(() => TodoUpdateOutput)
  async todoUpdate(
    @Args({ name: 'todoId', type: () => ID }) todoId: Todo['id'],
    @Args('input') input: TodoUpdateInput,
  ) {
    return this.todoService.todoUpdate(todoId, input);
  }

  @Mutation(() => TodoDeleteOutput)
  async todoDelete(
    @Args({ name: 'todoId', type: () => ID }) todoId: Todo['id'],
  ) {
    return this.todoService.todoDelete(todoId);
  }
}
