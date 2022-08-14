module.exports = {
  routes: [
    {
     method: 'GET',
     path: '/userinfo',
     handler: 'user.userDetail',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};
