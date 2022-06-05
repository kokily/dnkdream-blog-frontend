import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { checkAPI } from '../../../libs/api/auth';
import { useUserState } from '../../../libs/context/UserContext';

function useLoggedIn(isAdmin?: boolean) {
  const router = useRouter();
  const [user, setUser] = useUserState();
  const {} = useQuery('user', () => checkAPI(), {
    onSuccess: (data) => setUser(data),
    onError: () => {
      setUser(null);
      router.push('/');
    },
    retry: 0,
    enabled: true,
  });

  useEffect(() => {
    if (isAdmin && user) {
      if (isAdmin && user.admin === false) {
        alert('관리자만 이용할 수 있습니다!');
        router.push('/');
      }
    }
  }, [user]);

  return {
    user,
  };
}

export default useLoggedIn;
