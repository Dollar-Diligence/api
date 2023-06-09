import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

export default function hasRoles(
  user: DecodedIdToken,
  roles: string[],
): boolean {
  const userRoles = user?.roles || [];
  return userRoles.some((r) => roles.includes(r));
}
