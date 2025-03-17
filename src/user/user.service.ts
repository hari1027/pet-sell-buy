import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async userSignup(email: string, mobileNumber: string, password: string, address: string) {
    try {
      await this.prisma.user.create({
        data: { email, mobileNumber, password , address },
      });
      return "You have signed up successfully";
    } catch (error) {
      console.error("Signup Error:", error);
    }
  }
  
  async userLogin(email: string, password: string) {
    try {
      const user = await this.prisma.user.findUnique({ where: { email } });
      if (!user || user.password !== password) {
         return "Invalid email or password";
      }else {
         return user;
      }
    } catch (error) {
      console.error("Login Error:", error);
    }
  }

  async updateUser(id: string, email: string, password: string , mobileNumber: string, address: string) {
    try {
      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: { email, mobileNumber, address, password },
      });
      return updatedUser;
    } catch (error) {
      console.error("Update Error:", error);
    }
  }

  async deleteUser(id: string) {
    try {
      await this.prisma.user.delete({ where: { id } });
      return "User deleted successfully";
    } catch (error) {
      console.error("Delete Error:", error);
    }
  }

  async forgotPassword(email: string, password: string ) {
    try {
      await this.prisma.user.update({
        where: { email },
        data: { password: password }
      });
      return "password changed succeessfully";
    } catch (error) {
      console.error("password reset Error:", error);
    }
  }

  async getUserDetails(id: string) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });
      if (!user) {
         return "Invalid id";
      }else {
         return user;
      }
    } catch (error) {
      console.error("user Error:", error);
    }
  }
}
