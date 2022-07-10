'use strict';

/**
 * `ip-filtering` middleware.
 */

module.exports = (config, { strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    const req = ctx.request.headers.referer
    strapi.log.info('In ip-filtering middleware.');
    console.log({req})
    await next();
  };
};
