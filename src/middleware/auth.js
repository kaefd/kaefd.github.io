// import httpClient from '@/api'

// export default async function auth ({ next, router }) {
//     const token = localStorage.getItem('token')

//     if(!token) {
//         return router.push('/login')
//     }

//     try {
//         const response = await httpClient.post('auth/login', {
//             token: token
//         })

//         if(response.data.valid) {
//             return next()
//         } else {
//             return router.push('/login')
//         }
//     } catch (error) {
//         console.log(error);
//         return router.push('/login')
//     }
// }