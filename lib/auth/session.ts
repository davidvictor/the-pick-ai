import { compare, hash } from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';
import { NewUser } from '@/lib/db/schema';
import { getCookie, setCookie } from 'cookies-next';

const key = new TextEncoder().encode(process.env.AUTH_SECRET || 'fallback-secret-for-dev-only');
const SALT_ROUNDS = 10;

export async function hashPassword(password: string) {
  return hash(password, SALT_ROUNDS);
}

export async function comparePasswords(
  plainTextPassword: string,
  hashedPassword: string
) {
  return compare(plainTextPassword, hashedPassword);
}

type SessionData = {
  user: { id: number };
  expires: string;
};

export async function signToken(payload: SessionData) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1 day from now')
    .sign(key);
}

export async function verifyToken(input: string) {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ['HS256'],
  });
  return payload as SessionData;
}

/**
 * Get user session from cookies - FOR PAGES ROUTER
 * 
 * This version is safe to use in the pages/ directory
 * because it doesn't use next/headers
 */
export async function getSession(req?: any, res?: any) {
  const sessionValue = getCookie('session', { req, res });
  if (!sessionValue) return null;
  return verifyToken(String(sessionValue));
}

/**
 * Set user session in cookies - FOR PAGES ROUTER
 * 
 * This version is safe to use in the pages/ directory
 * because it doesn't use next/headers
 */
export async function setSession(user: NewUser, req?: any, res?: any) {
  const expiresInOneDay = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const session: SessionData = {
    user: { id: user.id! },
    expires: expiresInOneDay.toISOString(),
  };
  const encryptedSession = await signToken(session);
  
  setCookie('session', encryptedSession, {
    req,
    res,
    expires: expiresInOneDay,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });
}

/**
 * These functions should ONLY be imported in Server Components
 * within the app/ directory. They will cause errors if used in
 * the pages/ directory.
 */

// Separate file that will only be used in App Router
let appCookies: any = null;

/**
 * Get session for App Router (app/ directory) Server Components
 */
export async function getAppRouterSession() {
  try {
    // Use dynamic import to ensure server-only code and better tree-shaking
    const { cookies } = await import('next/headers');
    
    // Get cookies instance and properly await it
    const cookieStore = await cookies();
    const sessionValue = cookieStore.get('session')?.value;
    
    if (!sessionValue) return null;
    return await verifyToken(sessionValue);
  } catch (error) {
    console.error('Session access error:', error);
    return null; // Return null instead of throwing to avoid hard crashes
  }
}

/**
 * Set session for App Router (app/ directory) Server Components
 */
export async function setAppRouterSession(user: NewUser) {
  try {
    // Use dynamic import
    const { cookies } = await import('next/headers');
    
    const expiresInOneDay = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const session: SessionData = {
      user: { id: user.id! },
      expires: expiresInOneDay.toISOString(),
    };
    const encryptedSession = await signToken(session);
    
    // Get cookies instance and properly await it
    const cookieStore = await cookies();
    cookieStore.set('session', encryptedSession, {
      expires: expiresInOneDay,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
  } catch (error) {
    console.error('Session set error:', error);
    throw new Error('Failed to set session: ' + (error as Error).message);
  }
}
