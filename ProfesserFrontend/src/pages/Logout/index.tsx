import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ACCESS_TOKEN } from '@/constants';
import { removeCookie } from '@/lib';

export const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    removeCookie(ACCESS_TOKEN.key);
    navigate('/login');
  }, []);

  return <div>Logout...</div>;
};

export default Logout;
