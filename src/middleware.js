
export default function ({ next }) {
  if (localStorage.getItem('token') == false) {
    window.location.href = '/#/login'
  }

  return next();
}

