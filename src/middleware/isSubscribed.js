export default function isSubscribed ({ next, store }){
    if(!store.getters.auth.isSubscribed){
        return next({
           name: 'items'
        })
    }
   
    return next()
   }