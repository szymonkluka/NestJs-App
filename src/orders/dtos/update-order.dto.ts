import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateOrderDTO {
  @IsNotEmpty()
  @IsString()
  productId: string;

  @IsNotEmpty()
  @IsString()
  @Length(8)
  client: string;

  @IsNotEmpty()
  @IsString()
  address: string;
}