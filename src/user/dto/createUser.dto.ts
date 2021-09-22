import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Поле username должно быть заполнено!' })
  readonly username: string;
  @IsNotEmpty({ message: 'Поле email должно быть заполнено!' })
  @IsEmail({}, { message: 'Ваш email не корректен!' })
  readonly email: string;
  @IsNotEmpty({ message: 'Поле password должно быть заполнено!' })
  readonly password: string;
}
