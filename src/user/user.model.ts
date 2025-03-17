import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { PrismaService } from '../prisma.service';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@Module({
  providers: [UserService, UserResolver, PrismaService],
  exports: [UserService],
})
@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  mobileNumber?: string;

  @Field({ nullable: true })
  address?: string;
  
  @Field()
  password: string;
}