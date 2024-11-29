'use server';

import { SignJWT,jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { cache } from 'react';

export type SessionPayload = {
  userId: string;
  userName: string;
};

const secretKey = process.env.SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session,encodedKey,{
      algorithms: ['HS256'],
    });
    return payload;
  } catch (e) {
    e;
  }
}

export async function createSession(userId: string,userName: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ userId,userName });
  (await cookies()).set(
    'session',
    session,
    {
      httpOnly: true,
      secure: true,
      expires: expiresAt,
      sameSite: 'lax',
      path: '/',
    }
  );
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
}

export async function updateSession() {
  const session = (await cookies()).get('session')?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    return null;
  }

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const cookieStore = await cookies();
  cookieStore.set('session',session,{
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: 'lax',
    path: '/',
  });
}

export async function verifySession() {
  return await (cache(async () => {
    const cookie = (await cookies()).get('session')?.value;
    const session = await decrypt(cookie) as SessionPayload;

    return { isAuth: !!session?.userId,...session };
  }))();
};