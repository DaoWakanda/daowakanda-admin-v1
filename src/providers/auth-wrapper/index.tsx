'use server';

import { ReactNode, Suspense } from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Token } from '@/interface';
import { AuthClient } from './auth-client';

interface Props {
  children: ReactNode;
}

export const AuthWrapper = async ({ children }: Props) => {
  const validateAuth = async () => {
    const cookiesList = cookies();
    const auth = cookiesList.get('auth');

    if (auth?.value) {
      const parsedAuth = JSON.parse(auth.value);

      if (!!parsedAuth?.accessToken && !!parsedAuth?.expiresIn && !!parsedAuth?.expiryTime) {
        const newAuth: Token = {
          accessToken: parsedAuth.accessToken,
          expiresIn: parsedAuth.expiresIn,
          expiryTime: parsedAuth.expiryTime,
        };

        const currentTime = Date.now();

        if (currentTime < newAuth.expiryTime!) {
          return newAuth;
        }
      }
    }

    redirect('/auth/log-in');
  };

  const token = await validateAuth();

  return (
    <Suspense>
      <AuthClient token={token} />
      {children}
    </Suspense>
  );
};
