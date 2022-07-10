'use strict';

/**
 * A set of functions called "actions" for `shop`
 */

module.exports = {
  cartUpdate: async (ctx, _next) => {
    try {
      const { request: { body }, state: { user: { id } } } = ctx
      const data = await strapi.service('api::shop.shop').cartUpdate(body.product_id, body.qty, id)
      ctx.send({message: data})
    } catch (err) {
      console.log(err)
      ctx.throw(500)
    }
  },
  cartList: async (ctx, _next) => {
    try {
      const { state: { user: { id } } } = ctx
      const data = await strapi.service('api::shop.shop').cartList(id)
      ctx.send(data)
    } catch (err) {
      console.log(err)
      ctx.throw(500)
    }
  },
};
