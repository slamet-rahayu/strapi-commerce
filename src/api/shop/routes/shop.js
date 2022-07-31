module.exports = {
  routes: [
    {
     method: 'POST',
     path: '/shop/cart',
     handler: 'shop.cartUpdate',
     config: {
       policies: [],
       middlewares: [],
     },
    },
    {
     method: 'GET',
     path: '/shop/cart',
     handler: 'shop.cartList',
     config: {
       policies: [],
       middlewares: [],
     },
    },
    {
     method: 'DELETE',
     path: '/shop/cart',
     handler: 'shop.cartDelete',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};
