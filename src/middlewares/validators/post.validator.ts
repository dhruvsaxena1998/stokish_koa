import { JSONSchemaType } from 'ajv';
import { ajv } from '../../utils/instance';

import { IPostCreateDto } from '../../@types/post.types';

const createPostSchema: JSONSchemaType<IPostCreateDto> = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    body: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    keywords: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    thumbnail: { type: 'string', nullable: true },
  },
  required: ['title', 'body', 'keywords'],
  additionalProperties: false,
};

export const createPostValidator =
  ajv.compile<IPostCreateDto>(createPostSchema);
