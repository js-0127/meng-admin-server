import { PrismaClient } from '@prisma/client';
import {
    registerDecorator,
    ValidationOptions,
    ValidationArguments,
} from 'class-validator';

export function IsExistRule(
    table: string,
    validationOptions?: ValidationOptions,
) {
    return function (object: Record<string, any>, propertyName: string) {
        registerDecorator({
            name: 'isLongerThan',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [table],
            options: validationOptions,
            validator: {
                async validate(value: any, args: ValidationArguments) {
                    const prisma = new PrismaClient()
                    const result = await prisma[table].findUnique({
                        where: {
                            [propertyName]: args.value
                        }
                    })
                    return !Boolean(result)
                },
            },
        });
    };
}
