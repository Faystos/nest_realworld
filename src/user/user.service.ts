import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';

import { CreateUserDto } from '@app/user/dto/createUser.dto';
import { UserEntity } from '@app/user/user.entity';
import { JWT_SECRET } from '@app/config';
import { UserResponseInterface } from '@app/user/types/userResponse.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  createUser = async (createUserDto: CreateUserDto): Promise<UserEntity> => {
    const userByEmail = await this.userRepository.findOne({
      email: createUserDto.email,
    });
    const userNyUsername = await this.userRepository.findOne({
      username: createUserDto.username,
    });

    if (userByEmail || userNyUsername) {
      throw new HttpException(
        'Email или username уже существует',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const newUser = new UserEntity();
    Object.assign(newUser, createUserDto);
    return await this.userRepository.save(newUser);
  };

  buildUserResponse = (user: UserEntity): UserResponseInterface => {
    return {
      user: {
        ...user,
        token: this.generateJwt(user),
      },
    };
  };

  generateJwt = (user: UserEntity): string => {
    return sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      JWT_SECRET,
    );
  };
}
