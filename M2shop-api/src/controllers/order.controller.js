const { sequelize, Order, OrderItem, Product } = require('../models');

async function create(req, res) {
  const { customer_name, customer_email, customer_phone, shipping_address, items } = req.body;
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'Order items are required' });
  }

  const trx = await sequelize.transaction();
  try {
    const order = await Order.create({
      customer_name,
      customer_email,
      customer_phone,
      shipping_address,
      status: 'pending',
      total: 0,
    }, { transaction: trx });

    let total = 0;
    for (const item of items) {
      const product = await Product.findByPk(item.product_id, { transaction: trx, lock: trx.LOCK.UPDATE });
      if (!product) throw new Error('Product not found: ' + item.product_id);
      const quantity = Math.max(1, Number(item.quantity || 1));
      if (product.stock < quantity) throw new Error('Insufficient stock for product ' + product.id);

      await OrderItem.create({ order_id: order.id, product_id: product.id, quantity, price: product.price }, { transaction: trx });

      product.stock = product.stock - quantity;
      await product.save({ transaction: trx });

      total += Number(product.price) * quantity;
    }

    order.total = total;
    await order.save({ transaction: trx });

    await trx.commit();
    res.status(201).json(order);
  } catch (err) {
    await trx.rollback();
    res.status(400).json({ message: err.message || 'Error creating order' });
  }
}

module.exports = { create };
