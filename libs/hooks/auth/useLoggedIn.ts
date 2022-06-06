import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { checkAPI } from '../../api/auth';
import { useUserState } from '../../context/UserContext';

function useLoggedIn(isAdmin?: boolean) {
  const router = useRouter();
  const [user, setUser] = useUserState();
  useQuery('user', () => checkAPI(), {
    onSuccess: (data) => {
      setUser(data);
    },
    onError: () => {
      setUser(null);
    },
    retry: 0,
    enabled: true,
  });

  useEffect(() => {
    if (isAdmin) {
      if (isAdmin && (!user || user.admin === false)) {
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
