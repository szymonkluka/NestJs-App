import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, Length, Min } from 'class-validator';

export class UpdateProductDTO {
  @IsNotEmpty()
  @Length(10, 20)
  name: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  price: number;

  @IsString()
  @Transform(({ value }) => {
    if (Array.isArray(value)) {
      return value.join(', ');
    }
    if (typeof value === 'string') {
      return value;
    }
    return '';
  })
  description: string;
}