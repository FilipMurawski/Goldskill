import { randomBytes, scrypt as _scrypt, timingSafeEqual } from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt);
const SALT_LENGTH = 16; // 16 bytes (128-bit salt)
const KEY_LENGTH = 64; // 64 bytes (512-bit derived key)

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(SALT_LENGTH).toString("hex");
  const derivedKey = (await scrypt(password, salt, KEY_LENGTH)) as Buffer;
  return `${salt}:${derivedKey.toString("hex")}`;
}

export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  const [salt, key] = storedHash.split(":");
  const derivedKey = (await scrypt(password, salt, KEY_LENGTH)) as Buffer;

  // Use timingSafeEqual to prevent timing attacks
  return timingSafeEqual(Buffer.from(key, "hex"), derivedKey);
}
