import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { PetService } from './pet.service';
import { Pet } from './pet.model';
import GraphQLJSON from 'graphql-type-json';

@Resolver(() => Pet)
export class PetResolver {
  constructor(private petService: PetService) {}

  @Query(() => [Pet])
  async listPetsOnSale() {
    return this.petService.listPetsOnSale();
  }

  @Mutation(() => Pet)
  async addYourPetToSale(
    @Args('type') type: string,
    @Args('numbers') numbers: number,
    @Args('ownerId') ownerId: string,
    @Args('breed', { nullable: true }) breed?: string,
    @Args('gender', { nullable: true }) gender?: string,
    @Args('age', { nullable: true }) age?: number,
    @Args('price', { nullable: true }) price?: number,
    @Args('images', { type: () => GraphQLJSON, nullable: true }) images?: any,
    @Args('medicalRecords', { type: () => GraphQLJSON, nullable: true }) medicalRecords?: any,
  ) {
    return this.petService.addYourPetToSale({
      type,
      numbers,
      ownerId,
      breed: breed ?? null,
      gender: gender ?? null,
      age: age ?? null,
      price: price ?? null,
      images: images ?? [],
      medicalRecords: medicalRecords ?? [],
    });
  }

  @Mutation(() => String)
  async showInterest(
    @Args('id') id: string,
    @Args('email') email: string,
  ){
    return this.petService.showInterest(id,email)
  }

  @Mutation(() => String)
  async removeInterest(
    @Args('id') id: string,
    @Args('email') email: string,
  ){
    return this.petService.removeInterest(id,email)
  }

  @Mutation(() => Pet)
  async updatePet(
    @Args('id') id: string,
    @Args('type') type: string,
    @Args('numbers') numbers: number,
    @Args('ownerId') ownerId: string,
    @Args('breed', { nullable: true }) breed?: string,
    @Args('gender', { nullable: true }) gender?: string,
    @Args('age', { nullable: true }) age?: number,
    @Args('price', { nullable: true }) price?: number,
    @Args('images', { type: () => GraphQLJSON, nullable: true }) images?: any,
    @Args('medicalRecords', { type: () => GraphQLJSON, nullable: true }) medicalRecords?: any,
  ) {
    return this.petService.updatePet(id , {
      type,
      numbers,
      ownerId,
      breed: breed ?? null,
      gender: gender ?? null,
      age: age ?? null,
      price: price ?? null,
      images: images ?? [],
      medicalRecords: medicalRecords ?? [],
    });
  }

  @Mutation(() => String)
  async deletePet(@Args('id') id: string) {
    return this.petService.deletePet(id);
  }

}
