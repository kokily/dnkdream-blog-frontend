import type { ChangeEvent, KeyboardEvent } from 'react';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { loginAPI } from '../../../libs/api/auth';
import { useUserState } from '../../../libs/context/UserContext';
import { toast } from 'react-toastify';

function useLogin() {
  const router = useRouter();
  const [, setUser] = useUserState();
  const { mutate: login } = useMutation(loginAPI, {
    onSuccess: (data) => {
      setUser(data);
      toast.success('어서오세요!');
      router.push('/');
    },
  });
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });
  const { username, password } = inputs;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onLogin = useCallback(() => {
    if ([username, password].includes('')) {
      alert('빈 칸 없이 입력하세요.');
      return;
    }

    login({ username, password });
  }, [username, password, login]);

  const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onLogin();
    }
  };

  return {
    username,
    password,
    onChange,
    onLogin,
    onKeyPress,
  };
}

export default useLogin;
