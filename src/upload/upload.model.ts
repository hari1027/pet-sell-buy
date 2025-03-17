import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class UploadedFile {
  @Field()
  url: string;

  @Field()
  name: string;
}
