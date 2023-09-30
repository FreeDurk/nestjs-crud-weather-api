import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/typeorm/entities/Post';
import { Repository } from 'typeorm';
import { PostDetailsDto } from './dto/postDetails.dto';
import { HttpStatusCode } from 'axios';
@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    @InjectRepository(Post) private userRepository: Repository<Post>,
  ) {}

  posts() {
    return this.postRepository.find();
  }

  post(id: number) {
    return this.postRepository.findOneBy({ id });
  }

  async createPost(id: number, postDetails: PostDetailsDto) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new HttpException('Not Found', HttpStatusCode.NotFound);
    }

    const post = this.postRepository.create({
      ...postDetails,
      created_at: new Date(),
      updated_at: new Date(),
      user,
    });

    return this.postRepository.save(post);
  }
}
