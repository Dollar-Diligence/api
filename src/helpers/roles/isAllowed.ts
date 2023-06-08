import { ALLOWED_ROLES } from 'src/constants/roles';

export const isAllowed = (role: string) => ALLOWED_ROLES.includes(role);
