const { Category, Product } = require('./src/models');

async function populateDB() {
  try {
    // Evitar duplicados en cargas repetidas
    const categoriesCount = await Category.count();
    if (categoriesCount === 0) {
      const catElectronics = await Category.create({ name: 'Electronics', slug: 'electronics', description: 'Electronic devices and gadgets', image_url: 'https://picsum.photos/seed/electronics/800/400', display_order: 1 });
      const catFashion = await Category.create({ name: 'Fashion', slug: 'fashion', description: 'Clothing and accessories', image_url: 'https://picsum.photos/seed/fashion/800/400', display_order: 2 });

      await Product.bulkCreate([
        { name: 'Smartphone X', slug: 'smartphone-x', description: '6.5" OLED, 128GB', price: 699.99, image_url: 'https://picsum.photos/seed/phone/600/600', stock: 50, category_id: catElectronics.id, is_featured: true, is_new: true },
        { name: 'Wireless Headphones', slug: 'wireless-headphones', description: 'Noise cancelling', price: 149.99, image_url: 'https://picsum.photos/seed/headphones/600/600', stock: 120, category_id: catElectronics.id, is_featured: true },
        { name: 'T-Shirt Basic', slug: 'tshirt-basic', description: 'Cotton, unisex', price: 19.99, image_url: 'https://picsum.photos/seed/tshirt/600/600', stock: 200, category_id: catFashion.id, is_new: true }
      ]);
    }
  } catch (err) {
    console.error('Error populating DB', err);
  }
}

module.exports = { populateDB };
