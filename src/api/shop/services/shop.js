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
  async cartUpdate(product_id, qty, user_id) {
    try {
      const product = await strapi.db.query('api::product.product').findOne({where: { id: product_id }})
      const so_draft = await this.soDraft(user_id)
      const sol = await strapi.db.query('api::sales-order-line.sales-order-line').findOne({
        where : { 
          $and: [
            { product: product_id },
            { sales_order: so_draft.id }
          ]
        }
      })
      if (!sol) {
        await strapi.db.query('api::sales-order-line.sales-order-line').create({
          data: {
            name: product.name,
            product: product.id,
            price_unit: product.price,
            price_total: product.price * qty,
            sales_order: so_draft.id
          }
        })
      } else {
        await strapi.db.query('api::sales-order-line.sales-order-line').update({
          where: { id: sol.id },
          data: {
            name: product.name,
            product: product.id,
            price_unit: product.price,
            price_total: product.price * qty,
            sales_order: so_draft.id
          }
        })

        const so_drafts = await this.soDraft(user_id)

        const amount_total = so_drafts.sales_order_lines.reduce((a,b) => a.price_total + b.price_total, b)

        // await strapi.db.query('api::sales-order.sales-order').update({
        //   where: { id: so_draft.id },
        //   data: {
            
        //   }
        // })

        return amount_total;
      }
      return await this.soDraft(user_id);
    } catch (error) {
      throw new Error(error.message)
    }
  },
  async deleteCart(line_id, user_id) {
    const model = strapi.db.query('api::sales-order.sales-order')
    try {
      const ol_query = {
          where: {
          $and: [
            { users_permissions_user: user_id },
            { sales_order_lines: line_id }
          ]
        }
      }
      const ol = await model.findOne(ol_query)
      if (!ol) {
        throw ({httpCode: 404, message: "Order Not Found"})
      }
      await strapi.db.query('api::sales-order-line.sales-order-line').delete({where: { id: line_id }})
      return await model.findOne(ol_query)
    } catch (error) {
      
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
