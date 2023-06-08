import { SetMetadata } from '@nestjs/common';

export const Authorized = (bool?: boolean) =>
  SetMetadata('authorized', bool === false ? false : true);
