import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const skipAuthIfLoggedIn = async () => {
    const cookiesList = cookies();
    const auth = cookiesList.get('auth');

    if (auth?.value) {
      const parsedAuth = JSON.parse(auth.value);

      if (!!parsedAuth?.accessToken && !!parsedAuth?.expiresIn && !!parsedAuth?.expiryTime) {
        const newAuth = {
          accessToken: parsedAuth.accessToken,
          expiresIn: parsedAuth.expiresIn,
          expiryTime: parsedAuth.expiryTime,
        };

        const currentTime = Date.now();

        if (currentTime < newAuth.expiryTime!) {
          redirect('/dashboard');
        }
      }
    }
  };

  await skipAuthIfLoggedIn();

  return <>{children}</>;
};

export default AuthLayout;
