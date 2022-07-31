'use strict';

/**
 * shop service.
 */

module.exports = () => ({
  async soDraft(user_id) {
    try {
      const query = { 
        where: { 
          users_permissions_user: user_id 
        },
        populate: {
          sales_order_lines: true
        },
      }
      const so_draft = await strapi.db.query('api::sales-order.sales-order').findOne(query)
      if (!so_draft) {
        await strapi.db.query('api::sales-order.sales-order').create({
          data: {
            name: 'SO-' + new Date().toISOString(),
            status: 'draft',
            users_permissions_user: user_id
          },
        })
        return await strapi.db.query('api::sales-order.sales-order').findOne(query)
      }
      return so_draft
    } catch (error) {
      throw new Error(error.message)
    }
  },
  async computeAmountTotal(user_id) {
    try {
      const o_model = strapi.db.query('api::sales-order.sales-order')
      const so_draft = await this.soDraft(user_id);
      const amount_total = so_draft.sales_order_lines.map((v) => v.price_total).reduce((a,b) => a + b)
      await o_model.update({ where: { id: so_draft.id}, data: { amount_total } })
      return
    } catch (error) {
      throw new Error(error.message)      
    }
  },
  async cartUpdate(product_id, qty, user_id) {
    try {
      const p_model = strapi.db.query('api::product.product')
      const ol_model = strapi.db.query('api::sales-order-line.sales-order-line')
      const o_model = strapi.db.query('api::sales-order.sales-order')
      const product = await p_model.findOne({where: { id: product_id }})
      const so_draft = await this.soDraft(user_id)
      const sol = await ol_model.findOne({
        where : { 
          $and: [
            { product: product_id },
            { sales_order: so_draft.id }
          ]
        }
      })
      const ol_data = {
        name: product.name,
        product: product.id,
        price_unit: product.price,
        price_total: product.price * qty,
        sales_order: so_draft.id,
        qty
      }
      if (!sol) {
        await ol_model.create({
          data: ol_data
        })
      } else {
        await ol_model.update({
          where: { id: sol.id },
          data: ol_data
        })
      }
      await this.computeAmountTotal(user_id)
      return await this.soDraft(user_id)
    } catch (error) {
      throw new Error(error.message)
    }
  },
  async cartDelete(line_ids, user_id) {
    try {
      const ol_model = strapi.db.query('api::sales-order-line.sales-order-line')
      const so_draft = await this.soDraft(user_id)
      const ol_query = {
          where: {
          $and: [
            { sales_order: so_draft.id },
            { id: { $in: line_ids } }
          ]
        }
      }
      await ol_model.deleteMany(ol_query)
      return await this.soDraft(user_id)
    } catch (error) {
      throw error
    }
  },
  async cartList(user_id) {
    try {
      const data = await this.soDraft(user_id)
      return data
    } catch (error) {
      throw new Error(error.message)      
    }
  }
});
