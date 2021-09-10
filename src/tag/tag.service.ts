import { Injectable } from '@nestjs/common';

@Injectable()
export class TagService {
  getTags = (): string[] => {
    return ['Angular', 'React', 'Vue', 'Svetle'];
  };
}
