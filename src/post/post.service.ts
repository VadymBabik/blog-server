import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FilesService } from '../files/files.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepo: Repository<Post>,
    private readonly fileService: FilesService,
  ) {}
  async create(createPostDto: CreatePostDto, image: any): Promise<Post> {
    const fileName = await this.fileService.createFile(image);
    return this.postRepo.save({
      ...createPostDto,
      image: fileName,
    });
  }

  async findAll(): Promise<Post[]> {
    return this.postRepo.find();
  }

  async findOne(id: number): Promise<Post> {
    return this.postRepo.findOneBy({ id });
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    await this.postRepo.update(id, { ...updatePostDto });
    return this.postRepo.findOneBy({ id });
  }

  async remove(id: number): Promise<number> {
    await this.postRepo.remove(await this.postRepo.findOneBy({ id }));
    return id;
  }
}
