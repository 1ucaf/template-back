import { IsNotEmpty, IsString } from "class-validator";

export class DeleteDTO {
  @IsNotEmpty()
  @IsString()
  id: string;
}