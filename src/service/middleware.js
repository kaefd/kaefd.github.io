
export default function ({ next, router }) {
  if (localStorage.getItem('token') == null || localStorage.getItem('token') == false) {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    return router.push({ path: '/login' });
  }

  return next();
}
