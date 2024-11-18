import { useClient } from '@/hooks/use-client';
import { Token } from '@/interface';

export const useAuthActions = () => {
  const client = useClient();

  const login = async (email: string, password: string) => {
    const response = await client.post<Token>('auth/admin/login', { email, password });
    return response;
  };

  return {
    login,
  };
};
