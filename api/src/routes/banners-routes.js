const { Router } = require('express');
const bannerController = require('../controllers/Banner.controller'); 
const { authMiddleware, roleMiddleware, sessionMiddleware, optionalAuthMiddleware } = require('../middlewares/authMiddleware.mw');
const router = Router();
// Protegidas (usuario) o con sesión (anónimo)
router.get('', optionalAuthMiddleware, bannerController.listarTodos);
router.get('/:id', authMiddleware, roleMiddleware('admin', 'vendedor'), bannerController.obtenerPorId);
router.post('/', authMiddleware, roleMiddleware('admin', 'vendedor'), bannerController.crear);
router.put('/:id', authMiddleware, roleMiddleware('admin', 'vendedor'), bannerController.actualizar);
router.patch('/:id/toggle', authMiddleware, roleMiddleware('admin', 'vendedor'), bannerController.toggleActivo);
router.put('/orden', authMiddleware, roleMiddleware('admin', 'vendedor'), bannerController.actualizarOrden);
router.delete('/:id', authMiddleware, roleMiddleware('admin', 'vendedor'), bannerController.eliminar);

module.exports = router;
