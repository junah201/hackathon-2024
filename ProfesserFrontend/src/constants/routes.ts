import { Loadable } from '@/components/Loadable';

export const ROUTES = [
  {
    PATH: '/',
    ELEMENT: Loadable(() => import('@/pages/Home')),
    AUTH: true,
  },
  {
    PATH: '/login',
    ELEMENT: Loadable(() => import('@/pages/Login')),
    AUTH: false,
  },
  {
    PATH: '/logout',
    ELEMENT: Loadable(() => import('@/pages/Logout')),
    AUTH: false,
  },
  {
    PATH: '/signup',
    ELEMENT: Loadable(() => import('@/pages/Signup')),
    AUTH: false,
  },
  {
    PATH: '/appointment/:id',
    ELEMENT: Loadable(() => import('@/pages/Appointment')),
    AUTH: true,
  },
  {
    PATH: '*',
    ELEMENT: Loadable(() => import('@/pages/NotFound')),
    AUTH: false,
  },
];
