import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post as PostEntity } from './entities/post.entity';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createPostDto: CreatePostDto,
    @UploadedFile() image,
  ): Promise<PostEntity> {
    return this.postService.create(createPostDto, image);
  }

  @Get()
  async findAll(): Promise<PostEntity[]> {
    return this.postService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PostEntity> {
    return this.postService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<PostEntity> {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<number> {
    return this.postService.remove(+id);
  }
}
