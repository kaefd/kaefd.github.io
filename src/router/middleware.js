
export default function ({ next, router }) {
  const session = JSON.parse(localStorage.getItem('session'))
    if (session?.token == null || !session?.token) {
      localStorage.removeItem('session')
      return router.push('/login')
    }
    
    return next();
  }