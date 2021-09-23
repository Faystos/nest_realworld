import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty({ message: 'Поле email должно быть заполнено!' })
  @IsEmail({}, { message: 'Введенный email не корректен!' })
  readonly email: string;
  @IsNotEmpty({ message: 'Поле password должно быть заполнено!' })
  readonly password: string;
}
