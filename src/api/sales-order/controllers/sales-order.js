'use strict';

/**
 *  sales-order controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::sales-order.sales-order');
