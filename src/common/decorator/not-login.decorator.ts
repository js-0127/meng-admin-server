import { SetMetadata } from '@nestjs/common';

export const NotLogin = (...args: string[]) => SetMetadata('not-login', args);
