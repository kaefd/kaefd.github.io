
export default function ({ next, router }) {
  if (localStorage.getItem('token') == null) {
    return router.push({ path: '/login' });
  }

  return next();
}
