 
 

// Datos de ejemplo
const datosEjemplo = require('./datos.json'); 
const { ejecutarMigracion } = require('./migraciones.services');
const Bcryptjs = require("bcryptjs");
const Usuario = require('./src/models/Usuario.models');
const Banner = require('./src/models/Banner.models');
const populateDB = async () => {
  console.log("🔄 Iniciando población de base de datos...");
  
  if (process.env.DB_INIT !== "true") {
    console.log("⚠️  DB_INIT no está habilitado. Saltando población.");
    return;
  }

  try {
    console.log("📦 Inicializando registros en DB!");

   
    await ejecutarMigracion();
    const usuarios = datosEjemplo.usuarios;

    for (const u of usuarios) {
      const salt = Bcryptjs.genSaltSync(10);
      const hashedPassword = Bcryptjs.hashSync('12345678', salt);

      const nuevoUsuario = await Usuario.create({
        email: u.email,
        password: hashedPassword,
        nombre: u.nombre, 
        telefono: u.telefono || '',
        documento: u.documento || '',
        fechaNacimiento: u.fechaNacimiento || null,
        activo: u.activo ?? true,
        rol: u.rol || 'cliente',
        emailVerificado: u.emailVerificado ?? false,
      });
    console.log("email ",nuevoUsuario.email);

    }

const banners = [
 {
    "id": 1,
    "title": "Nueva Colección Otoño 2024",
    "subtitle": "Elegancia y estilo en cada prenda",
    "image": "https://www.cavallaro.com.py/cdn/shop/files/BANNER_WEB.jpg?v=1768840115",
    "url": "/",
    "active": true,
    "order": 1
  },
  {
    "id": 2,
    "title": "Hasta 40% de Descuento",
    "subtitle": "En productos seleccionados",
    "image": "https://www.cavallaro.com.py/cdn/shop/files/banner-kchiporro.png?v=1765803687",
    "url": "/",
    "active": true,
    "order": 2
  },
  {
    "id": 3,
    "title": "Calzados Premium",
    "subtitle": "Comodidad y distinción",
    "image": "https://www.cavallaro.com.py/cdn/shop/files/BANNER-CAVAPUNTOS600.jpg?v=1758890407",
    "url": "/",
    "active": true,
    "order": 3
  },
  {
    "id": 4,
    "title": "Calzados Premium",
    "subtitle": "Comodidad y distinción",
    "image": "https://www.cavallaro.com.py/cdn/shop/files/banner-3.jpg?v=1754147528",
    "url": "/",
    "active": true,
    "order": 4
  }
]
 for (const b of banners) {

   const x = await Banner.create({
        titulo: b.title,
          subtitulo: b.title,
          imagenUrl:  b.image,
          imagenMobileUrl:  null,
          link:  b.url,
          textoBoton: '' ,//Texto del botón CTA (ej: "Comprar Ahora", "Ver Más
          tipoBoton:'primario',
          posicionTexto:  'centro',//'izquierda', 'centro', 'derecha'
          colorTexto: '#FFFFFF',
          activo:   true,
          orden: b.id,
          fechaInicio: new Date(),
          fechaFin: new Date('2025-12-31'), 
          tipoDispositivo:'todos',   //'todos', 'desktop', 'mobile'
       });
 }

    



    console.log("\n👤 Usuarios creados:");
    console.log("   - admin@cavallaro.com.py (Admin)");
    console.log("   - vendedor@cavallaro.com.py (Vendedor)");
    console.log("   - juan.perez@gmail.com (Cliente)");
    console.log("   - ana.martinez@hotmail.com (Cliente)");
    console.log("   - roberto.gomez@yahoo.com (Cliente)");
    console.log("   📝 Password para todos: password123");

  } catch (error) {
    console.error("❌ Error al poblar la base de datos:", error);
    throw error;
  }
};
 
module.exports = { populateDB  };