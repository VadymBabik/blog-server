import { MaxLength, MinLength } from 'class-validator';

export class CreatePostDto {
  // @MinLength(1, {
  //   message: 'Title is too short',
  // })
  // @MaxLength(15, {
  //   message: 'Title is too long',
  // })
  readonly title: string;

  // @MinLength(5, {
  //   message: 'Content is too short',
  // })
  // @MaxLength(200, {
  //   message: 'Content is too long',
  // })
  readonly content: string;
}
