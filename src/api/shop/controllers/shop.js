'use strict';

/**
 * A set of functions called "actions" for `shop`
 */

module.exports = {
  cartUpdate: async (ctx, _next) => {
    try {
      const { request: { body }, state: { user: { id } } } = ctx
      const data = await strapi.service('api::shop.shop').cartUpdate(body.product_id, body.qty, id)
      ctx.send(data)
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
  cartDelete: async (ctx, _next) => {
    try {
      const { 
        state: { 
          user: { id } 
        },
        request: { query: { line_id } } 
      } = ctx
      const line_ids = line_id.split(',')
      const datas = await strapi.service('api::shop.shop').cartDelete(line_ids, id)
      ctx.send(datas)
    } catch (err) {
      console.log(err)
      if (err.httpStatusCode) {
        ctx.throw(err.httpStatusCode, err.message)
      }
      ctx.throw(500)
    }
  },
};
