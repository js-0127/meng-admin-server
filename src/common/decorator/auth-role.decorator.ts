import { UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '../guard/auth.guard';
import { Role } from './role.decorator';

export const RoleAuth = (...args: string[]) => {
    return applyDecorators(
        Role(...args),
        UseGuards(AuthGuard),
    )
}
