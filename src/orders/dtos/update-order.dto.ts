import { IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';

export class UpdateOrderDTO {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  productId: string;

  @IsNotEmpty()
  @IsString()
  @Length(8)
  clientId: string;

  @IsNotEmpty()
  @IsString()
  address: string;
}