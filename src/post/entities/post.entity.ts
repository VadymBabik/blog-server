import { Column, Entity } from 'typeorm';
import { Base } from '../../helpers/Base/Base';

@Entity('Post')
export class Post extends Base {
  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  image: string;
}
