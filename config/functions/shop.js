module.exports = () => ({
  async soDraft(user_id) {
    try {
      const so_draft = await strapi.db.query('api::sales-order.sales-order').findOne({where: { users_permissions_user: user_id }})
      if (!so_draft) {
        await strapi.db.query('api::sales-order.sales-order').create({
          data: {
            name: 'SO-' + new Date().toISOString(),
            status: 'draft',
            users_permissions_user: user_id
          }
        })
        return await strapi.db.query('api::sales-order.sales-order').findOne({where: { users_permissions_user: user_id }})
      }
      return "success"
    } catch (error) {
      throw new Error(error.message)
    }
  },
})