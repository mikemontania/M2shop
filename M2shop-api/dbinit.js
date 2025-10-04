const { Category, Product } = require('./src/models');

async function populateDB() {
  try {
    const categoriesCount = await Category.count();
    if (categoriesCount === 0) {
      // Categorías
      const catHigiene = await Category.create({
        name: 'Higiene Personal',
        slug: 'higiene-personal',
        description: 'Jabones y productos de higiene personal',
        image_url: 'https://picsum.photos/seed/higiene/800/400',
        display_order: 1
      });

      const catPrendas = await Category.create({
        name: 'Cuidado de las Prendas',
        slug: 'cuidado-prendas',
        description: 'Detergentes y suavizantes para ropa',
        image_url: 'https://picsum.photos/seed/prendas/800/400',
        display_order: 2
      });

      const catHogar = await Category.create({
        name: 'Limpieza y Desinfección del Hogar',
        slug: 'limpieza-hogar',
        description: 'Productos de limpieza y desinfección para el hogar',
        image_url: 'https://picsum.photos/seed/hogar/800/400',
        display_order: 3
      });

      // Productos
      await Product.bulkCreate([
        // --- Higiene Personal ---
        { name: 'CAJA EXHIBIDORA COCO TOC. 5X1 Surtido', slug: 'caja-exhibidora-coco-toc-5x1', description: 'Jabón surtido', price: 37500, image_url: 'https://picsum.photos/seed/product1/600/600', stock: 50, category_id: catHigiene.id, is_featured: true },
        { name: 'JABON C2 Armonía Pura Tripack', slug: 'jabon-c2-armonia-pura-tripack', description: 'El jabón de Tocador C2 posee una fórmula exclusiva con aceite de almendra de coco, glicerina y exquisitas fragancias florales y frutales.', price: 12300, image_url: 'https://picsum.photos/seed/product2/600/600', stock: 80, category_id: catHigiene.id },
        { name: 'JABON C2 Calma Mistica', slug: 'jabon-c2-calma-mistica', description: 'El jabón de Tocador C2 posee una fórmula exclusiva con aceite de almendra de coco, glicerina y exquisitas fragancias florales y frutales.', price: 4200, image_url: 'https://picsum.photos/seed/product3/600/600', stock: 80, category_id: catHigiene.id, is_new: true },
        { name: 'JABON COCO Berries', slug: 'jabon-coco-berries', description: 'El jabón de Tocador C2 posee una fórmula exclusiva con aceite de almendra de coco, glicerina y exquisitas fragancias florales y frutales.', price: 4690, image_url: 'https://picsum.photos/seed/product4/600/600', stock: 90, category_id: catHigiene.id },
        { name: 'JABON COCO Petit Grain', slug: 'jabon-coco-petit-grain', description: 'El jabón de Tocador C2 posee una fórmula exclusiva con aceite de almendra de coco, glicerina y exquisitas fragancias florales y frutales.', price: 5025, image_url: 'https://picsum.photos/seed/product5/600/600', stock: 90, category_id: catHigiene.id },
        { name: 'JABON COCO Verbena', slug: 'jabon-coco-verbena', description: 'El jabón de Tocador C2 posee una fórmula exclusiva con aceite de almendra de coco, glicerina y exquisitas fragancias florales y frutales.', price: 5025, image_url: 'https://picsum.photos/seed/product6/600/600', stock: 90, category_id: catHigiene.id },
        { name: 'JABON C2 Humectante Leche Almendras', slug: 'jabon-c2-leche-almendras', description: 'El jabón de Tocador C2 posee una fórmula exclusiva con aceite de almendra de coco, glicerina y exquisitas fragancias florales y frutales.', price: 6300, image_url: 'https://picsum.photos/seed/product7/600/600', stock: 80, category_id: catHigiene.id },
        { name: 'COMBO NAVIDEÑO COCO PURO KIT', slug: 'combo-navideno-coco-puro-kit', description: 'El jabón de Tocador C2 posee una fórmula exclusiva con aceite de almendra de coco, glicerina y exquisitas fragancias florales y frutales.', price: 128500, image_url: 'https://picsum.photos/seed/product8/600/600', stock: 30, category_id: catHigiene.id },
        { name: 'COMBO NAVIDEÑO PREMIUM KIT', slug: 'combo-navideno-premium-kit', description: 'El jabón de Tocador C2 posee una fórmula exclusiva con aceite de almendra de coco, glicerina y exquisitas fragancias florales y frutales.', price: 199400, image_url: 'https://picsum.photos/seed/product9/600/600', stock: 30, category_id: catHigiene.id },
        { name: 'COMBO NAVIDEÑO ECONOMICO KIT', slug: 'combo-navideno-economico-kit', description: 'El jabón de Tocador C2 posee una fórmula exclusiva con aceite de almendra de coco, glicerina y exquisitas fragancias florales y frutales.', price: 70800, image_url: 'https://picsum.photos/seed/product10/600/600', stock: 30, category_id: catHigiene.id },

        // --- Cuidado de las Prendas ---
        { name: 'DETERGENTE LAVAVAJILLAS PIXOL 4L LIMON', slug: 'detergente-lavavajillas-pixol-limon', description: 'El jabón de Tocador C2 posee una fórmula exclusiva con aceite de almendra de coco, glicerina y exquisitas fragancias florales y frutales.', price: 31875, image_url: 'https://picsum.photos/seed/product11/600/600', stock: 60, category_id: catPrendas.id, is_featured: true },
        { name: 'DETERGENTE LAVAVAJILLAS CONCENTRADO 350ml', slug: 'detergente-lavavajillas-350ml', description: 'El jabón de Tocador C2 posee una fórmula exclusiva con aceite de almendra de coco, glicerina y exquisitas fragancias florales y frutales.', price: 5000, image_url: 'https://picsum.photos/seed/product12/600/600', stock: 70, category_id: catPrendas.id },
        { name: 'SUAVIZANTE PIXOL 2L', slug: 'suavizante-pixol-2l', description: 'El jabón de Tocador C2 posee una fórmula exclusiva con aceite de almendra de coco, glicerina y exquisitas fragancias florales y frutales.', price: 17500, image_url: 'https://picsum.photos/seed/product13/600/600', stock: 80, category_id: catPrendas.id },
        { name: 'DETERGENTE ROPA COLOR 1L', slug: 'detergente-ropa-color-1l', description: 'El jabón de Tocador C2 posee una fórmula exclusiva con aceite de almendra de coco, glicerina y exquisitas fragancias florales y frutales.', price: 8500, image_url: 'https://picsum.photos/seed/product14/600/600', stock: 90, category_id: catPrendas.id },
        { name: 'DETERGENTE ROPA BLANCA 1L', slug: 'detergente-ropa-blanca-1l', description: 'El jabón de Tocador C2 posee una fórmula exclusiva con aceite de almendra de coco, glicerina y exquisitas fragancias florales y frutales.', price: 8500, image_url: 'https://picsum.photos/seed/product15/600/600', stock: 90, category_id: catPrendas.id },
        { name: 'DETERGENTE LIQUIDO 2L', slug: 'detergente-liquido-2l', description: 'El jabón de Tocador C2 posee una fórmula exclusiva con aceite de almendra de coco, glicerina y exquisitas fragancias florales y frutales.', price: 18000, image_url: 'https://picsum.photos/seed/product16/600/600', stock: 70, category_id: catPrendas.id, is_new: true },

        // --- Limpieza del Hogar ---
        { name: 'LIMP MULTIUSO PIXOL LAVANDA 4L', slug: 'limp-multiuso-pixol-lavanda', description: 'El jabón de Tocador C2 posee una fórmula exclusiva con aceite de almendra de coco, glicerina y exquisitas fragancias florales y frutales.', price: 40800, image_url: 'https://picsum.photos/seed/product17/600/600', stock: 40, category_id: catHogar.id },
        { name: 'LIMP MULTIUSO PIXOL BOUQUET FLORAL 4L', slug: 'limp-multiuso-pixol-bouquet-floral', description: 'El jabón de Tocador C2 posee una fórmula exclusiva con aceite de almendra de coco, glicerina y exquisitas fragancias florales y frutales.', price: 33600, image_url: 'https://picsum.photos/seed/product18/600/600', stock: 40, category_id: catHogar.id },
        { name: 'LIMP MULTIUSO PIXOL FRESCURA HERBAL 4L', slug: 'limp-multiuso-pixol-frescura-herbal', description: 'El jabón de Tocador C2 posee una fórmula exclusiva con aceite de almendra de coco, glicerina y exquisitas fragancias florales y frutales.', price: 40800, image_url: 'https://picsum.photos/seed/product19/600/600', stock: 40, category_id: catHogar.id },
        { name: 'LIMP MULTIUSO PIXOL CITRONELLA 4L', slug: 'limp-multiuso-pixol-citronella', description: 'El jabón de Tocador C2 posee una fórmula exclusiva con aceite de almendra de coco, glicerina y exquisitas fragancias florales y frutales.', price: 40800, image_url: 'https://picsum.photos/seed/product20/600/600', stock: 40, category_id: catHogar.id },
        { name: 'ESPONJA PIXOL Pack x6', slug: 'esponja-pixol-6', description: 'El jabón de Tocador C2 posee una fórmula exclusiva con aceite de almendra de coco, glicerina y exquisitas fragancias florales y frutales.', price: 17000, image_url: 'https://picsum.photos/seed/product21/600/600', stock: 60, category_id: catHogar.id },
        { name: 'LIMPIADOR CONCENTRADO DESINFECTANTE 900ml', slug: 'limpiador-concentrado-900ml', description: 'El jabón de Tocador C2 posee una fórmula exclusiva con aceite de almendra de coco, glicerina y exquisitas fragancias florales y frutales.', price: 11220, image_url: 'https://picsum.photos/seed/product22/600/600', stock: 50, category_id: catHogar.id },
        { name: 'PAÑO MULTIUSO PIXOL', slug: 'pano-multiuso-pixol', description: 'El jabón de Tocador C2 posee una fórmula exclusiva con aceite de almendra de coco, glicerina y exquisitas fragancias florales y frutales.', price: 12500, image_url: 'https://picsum.photos/seed/product23/600/600', stock: 50, category_id: catHogar.id },
        { name: 'TRAPO LIMPIEZA 5 UNIDADES', slug: 'trapo-limpieza-5', description: 'El jabón de Tocador C2 posee una fórmula exclusiva con aceite de almendra de coco, glicerina y exquisitas fragancias florales y frutales.', price: 9500, image_url: 'https://picsum.photos/seed/product24/600/600', stock: 40, category_id: catHogar.id }
      ]);

      console.log('Base de datos poblada con productos de Cavallaro.');
    }
  } catch (err) {
    console.error('Error populating DB', err);
  }
}

module.exports = { populateDB };
