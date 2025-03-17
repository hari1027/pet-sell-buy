import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PetService {
  constructor(private prisma: PrismaService) {}

  async listPetsOnSale() {
    try {
      const pets = await this.prisma.pet.findMany();
      return pets;
    } catch (error) {
      console.error("Error fetching pets on sale:", error);
    }
  }

  async addYourPetToSale(data: any) {
    try {
      const pet = await this.prisma.pet.create({ data: {
        ...data,
      }, });
       return pet;
    } catch (error) {
      console.error('Error adding pet:', error);
    }
  }

  async showInterest(id: string, email: string ) {
    try {
      await this.prisma.pet.update({
        where: { id },
        data: {
          interestedBy: {
            push: email,
          },
        }
      });
      return "your interest have been added succeessfully";
    } catch (error) {
      console.error("show interest Error:", error);
    }
  }

  async removeInterest(id: string, email: string) {
    try {
      const pet = await this.prisma.pet.findUnique({
        where: { id },
        select: { interestedBy: true },
      });
  
      if (!pet) {
        return "Pet not found";
      }
  
      const updatedInterestedBy = (pet.interestedBy as string[]).filter(
        (e) => e !== email
      );
  
      await this.prisma.pet.update({
        where: { id },
        data: { interestedBy: updatedInterestedBy },
      });
  
      return "Your interest has been removed successfully";
    } catch (error) {
      console.error("remove interest Error:", error);
    }
  }

  async updatePet(id:string , data: any) {
    try {
      const pet = await this.prisma.pet.update({
         where: {id},
         data: {...data} 
        });
       return pet;
    } catch (error) {
      console.error('Error updating pet:', error);
    }
  }

  async deletePet(id: string) {
    try {
      await this.prisma.pet.delete({ where: { id } });
      return "pet deleted successfully";
    } catch (error) {
      console.error("Delete Error:", error);
    }
  }
  
}
