import { InputType, ObjectType } from '@nestjs/graphql';
import { TodoCreateInput, TodoCreateOutput } from './todo-create.dto';

@InputType()
export class TodoUpdateInput extends TodoCreateInput {}

@ObjectType()
export class TodoUpdateOutput extends TodoCreateOutput {}
