
import { PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ZodSchema } from 'zod';
import { fromError } from 'zod-validation-error';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) { }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: unknown, _: ArgumentMetadata): any {
    console.log('ZodValidationPipe transform called with value:', value);
    const result = this.schema.safeParse(value);
    if (!result.success) {
      throw new BadRequestException(fromError(result.error).message);
    }
    return result.data;
  }
}
