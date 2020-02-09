import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { %className%Query } from '../impl/%name%.query';

@QueryHandler(%className%Query)
export class %className%Handler implements IQueryHandler<%className%Query> {

  async execute(query: %className%Query) {
  }
}
