import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './models/todo.model';
import { TodoMutationsResolver } from './resolvers/todo.mutations.resolvers';
import { TodoQueriesResolver } from './resolvers/todo.queries.resolver';
import { TodoService } from './todo.service';

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  providers: [TodoService, TodoMutationsResolver, TodoQueriesResolver],
})
export class TodoModule {}
