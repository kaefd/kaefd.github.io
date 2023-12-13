
export default function ({ next, router }) {
    if (localStorage.getItem('token') == null || !localStorage.getItem('token')) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      return router.push('/login')
    }
  
    return next();
  }
  