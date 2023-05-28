import { Entity, Property } from '@mikro-orm/core';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { CoreEntity } from '../common';

@InputType('TaskInput', { isAbstract: true })
@ObjectType()
@Entity()
export class Task extends CoreEntity {
  @Field()
  @IsString()
  @Property()
  description: string;
}
