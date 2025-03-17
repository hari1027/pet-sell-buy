import { Module } from '@nestjs/common';
import { PetService } from './pet.service';
import { PetResolver } from './pet.resolver';
import { PrismaService } from '../prisma.service';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@Module({
  providers: [PetService, PetResolver, PrismaService],
  exports: [PetService],
})

@ObjectType()
export class Image {
  @Field()
  url: string;

  @Field()
  name: string;
}

@ObjectType()
export class Pet {
  @Field(() => ID)
  id: string;

  @Field()
  type: string;

  @Field()
  numbers: number;

  @Field()
  ownerId: string;

  @Field({ nullable: true }) 
  breed?: string;

  @Field({ nullable: true })
  gender?: string;

  @Field({ nullable: true })
  age?: number;

  @Field({ nullable: true })
  price?: number;

  @Field(() => [String], { nullable: true })
  interestedBy?: string[];

  @Field(() => [Image], { nullable: true })
  images?: Image[];

  @Field(() => [Image], { nullable: true }) 
  medicalRecords?: Image[];

}