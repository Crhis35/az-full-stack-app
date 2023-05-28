import { PrimaryKey, Property } from '@mikro-orm/core';
import { Field, ObjectType } from '@nestjs/graphql';
import { randomUUID } from 'crypto';

@ObjectType()
export abstract class CoreEntity {
  @Field()
  @PrimaryKey({ type: 'uuid' })
  id: string = randomUUID();

  @Property({ type: 'timestamptz' })
  @Field(() => Date)
  createdAt = new Date();

  @Property({ type: 'timestamptz', onUpdate: () => new Date() })
  @Field(() => Date)
  updatedAt = new Date();

  constructor(body = {}) {
    Object.assign(this, body);
  }
}
