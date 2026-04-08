import { randomBytes } from "node:crypto";

import bcrypt from "bcryptjs";

const KEY_BYTE_LEN = 32;
const BCRYPT_ROUNDS = 12;

export function generateCmsApiKey(): { plaintext: string; prefix: string } {
  const plaintext = randomBytes(KEY_BYTE_LEN).toString("base64url");
  const prefix = plaintext.slice(0, 8);
  return { plaintext, prefix };
}

export async function hashCmsApiKey(plaintext: string): Promise<string> {
  return bcrypt.hash(plaintext, BCRYPT_ROUNDS);
}
