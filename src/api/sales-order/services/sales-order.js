'use strict';

/**
 * sales-order service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::sales-order.sales-order');
