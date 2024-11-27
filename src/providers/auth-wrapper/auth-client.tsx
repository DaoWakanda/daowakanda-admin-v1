'use client';

import { Token } from '@/interface';
import { authAtom } from '@/state';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

interface Props {
  token?: Token;
}

export const AuthClient = ({ token }: Props) => {
  const setAuth = useSetRecoilState(authAtom);

  useEffect(() => {
    setAuth(token || null);
  }, [token]);

  return null;
};
