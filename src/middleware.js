
export default function ({ next, router }) {
  if (localStorage.getItem('token') == false) {
    return router.push('login');
  }

  return next();
}

