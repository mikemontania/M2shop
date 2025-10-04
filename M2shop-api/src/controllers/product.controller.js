const { Product, Category } = require('../models');
const { Op } = require('sequelize');

async function list(req, res) {
  const { category_slug, is_featured, is_new, search } = req.query;

  const where = {};
  if (typeof is_featured !== 'undefined') where.is_featured = is_featured === 'true';
  if (typeof is_new !== 'undefined') where.is_new = is_new === 'true';
  if (typeof search === 'string' && search.trim() !== '') where.name = { [Op.iLike]: `%${search}%` };

  const include = [];
  if (category_slug) {
    include.push({ model: Category, where: { slug: category_slug } });
  } else {
    include.push(Category);
  }

  const items = await Product.findAll({ include, where, order: [["created_at", "DESC"]] });
  res.json(items);
}

async function get(req, res) {
  const item = await Product.findByPk(req.params.id, { include: Category });
  if (!item) return res.status(404).json({ message: 'Product not found' });
  res.json(item);
}

async function getBySlug(req, res) {
  const item = await Product.findOne({ where: { slug: req.params.slug }, include: Category });
  if (!item) return res.status(404).json({ message: 'Product not found' });
  res.json(item);
}

async function create(req, res) {
  const item = await Product.create(req.body);
  res.status(201).json(item);
}

async function update(req, res) {
  const item = await Product.findByPk(req.params.id);
  if (!item) return res.status(404).json({ message: 'Product not found' });
  await item.update(req.body);
  res.json(item);
}

async function remove(req, res) {
  const item = await Product.findByPk(req.params.id);
  if (!item) return res.status(404).json({ message: 'Product not found' });
  await item.destroy();
  res.status(204).send();
}

module.exports = { list, get, create, update, remove };
module.exports.getBySlug = getBySlug;
