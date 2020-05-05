import Dashboard from './Dashboard'
import NotFound from './NotFound'
import Login from './Login'

export default [
  {
    name: 'dashboard',
    path: '/dashboard',
    component: Dashboard
  },
  {
    name: 'notFound',
    path: '/not-found',
    component: NotFound
  },
  {
    name: 'login',
    path: '/login',
    component: Login
  }
]
