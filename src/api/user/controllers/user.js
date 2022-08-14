'use strict';

/**
 * A set of functions called "actions" for `user`
 */

module.exports = {
  userDetail: async (ctx, next) => {
    try {
      const { state: { user: {
        id,
        username,
        email
      } } } = ctx
      return {
        id,
        username,
        email
      }
    } catch (err) {
      ctx.body = err;
    }
  }
};
