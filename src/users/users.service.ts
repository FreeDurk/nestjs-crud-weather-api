import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';
import { CreateUserType } from './types/CreateUser.type';
import { UpdateUserType } from './types/UpdateUser.type';
import { CreateProfileType } from './types/CreateProfile.type';
import { HttpStatusCode } from 'axios';
import { Profile } from 'src/typeorm/entities/Profile';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
  ) {}
  fetchUser() {
    return this.userRepository.find({ relations: ['profile', 'posts'] });
  }

  createuser(userDetails: CreateUserType) {
    try {
      const newUser = this.userRepository.create({
        ...userDetails,
        created_at: new Date(),
      });

      this.userRepository.save(newUser);

      return newUser;
    } catch (error) {
      throw new HttpException(error.response.data, error.response.status);
    }
  }

  updateUser(id: number, userDetails: UpdateUserType) {
    return this.userRepository.update({ id }, { ...userDetails });
  }

  async createProfile(id: number, profileData: CreateProfileType) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new HttpException('Not Found', HttpStatusCode.NotFound);
    }

    const newProfile = this.profileRepository.create({
      ...profileData,
      created_at: new Date(),
    });

    const dbProfile = await this.profileRepository.save(newProfile);

    user.profile = dbProfile;

    return this.userRepository.save(user);
  }
}
