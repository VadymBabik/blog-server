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
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post as PostEntity } from './entities/post.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { diskStorage } from 'multer';
import * as uuid from 'uuid';
import * as path from 'path';
import { imageFileFilter } from '../helpers/imageFileFilter';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: path.resolve(__dirname, '..', 'static'),
        filename(
          _,
          file: Express.Multer.File,
          callback: (error: Error | null, filename: string) => void,
        ) {
          try {
            const fileName: string = uuid.v4();
            const extension: string = path.parse(file.originalname).ext;
            callback(null, `${fileName}${extension}`);
          } catch (e) {
            throw new HttpException(
              'An error occurred while writing the file',
              HttpStatus.INTERNAL_SERVER_ERROR,
            );
          }
        },
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async create(
    @Body() createPostDto: CreatePostDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<PostEntity> {
    return this.postService.create(createPostDto, image.filename);
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
