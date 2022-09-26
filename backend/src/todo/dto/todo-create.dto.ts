import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Todo } from '../models/todo.model';

@InputType()
export class TodoCreateInput {
  @Field(() => String)
  title: string;
  @Field(() => String)
  description: string;
}

@ObjectType()
export class TodoCreateOutput {
  @Field(() => Todo)
  todo: Todo;
}
