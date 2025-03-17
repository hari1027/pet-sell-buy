import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.model';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => String)
  async userSignup(
    @Args('email') email: string,
    @Args('mobileNumber') mobileNumber: string,
    @Args('password') password: string,
    @Args('address') address: string
  ) {
    return this.userService.userSignup(email, mobileNumber, password, address);
  }

  @Mutation(() => User, { nullable: true })
  async userLogin(@Args('email') email: string, @Args('password') password: string) {
    return this.userService.userLogin(email, password);
  }

  @Mutation(() => User, {nullable : true})
  async updateUser(
    @Args('id') id: string,
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('mobileNumber') mobileNumber: string,
    @Args('address') address: string
  ) {
    return this.userService.updateUser(id , email, password, mobileNumber, address);
  }

  @Mutation(() => String)
  async deleteUser(
    @Args('id') id: string,
  ) {
    return this.userService.deleteUser(id);
  }

  @Mutation(() => String)
  async forgotPassword(@Args('email') email: string, @Args('password') password: string) {
    return this.userService.forgotPassword(email, password);
  }

  @Mutation(() => User, { nullable: true })
  async getUserDetails(@Args('id') id: string) {
    return this.userService.getUserDetails(id);
  }

}