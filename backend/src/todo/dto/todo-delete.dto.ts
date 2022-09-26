import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Todo } from '../models/todo.model';

@ObjectType()
export class TodoDeleteOutput {
  @Field(() => ID)
  todoId: Todo['id'];
}
