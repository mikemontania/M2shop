import api from './api'

// ========================================
// INTERFACES
// ========================================

export interface Banner {
  id: number
  titulo: string
  subtitulo?: string
  imagenUrl: string
  imagenMobileUrl?: string
  link?: string
  textoBoton?: string
  tipoBoton?: 'primario' | 'secundario' | 'outline'
  posicionTexto?: 'izquierda' | 'centro' | 'derecha'
  colorTexto?: string
  activo: boolean
  orden: number
  fechaInicio?: string | null
  fechaFin?: string | null
  tipoDispositivo?: 'todos' | 'desktop' | 'mobile'
  createdAt?: string
  updatedAt?: string
}

export interface BannerResponse {
  mensaje?: string
  banner?: Banner
  banners?: Banner[]
  total?: number
  paginas?: number
  paginaActual?: number
  activo?: boolean
}

// ========================================
// SERVICIO DE BANNERS
// ========================================

class BannerService {
  /**
   * Listar banners activos (público)
   */
  async listarActivos(tipoDispositivo: 'todos' | 'desktop' | 'mobile' = 'todos'): Promise<Banner[]> {
    try {
      console.log('📞 BannerService.listarActivos() - Llamando a API...')
      const response = await api.get('/banners/activos', { params: { tipoDispositivo } })
      console.log('✅ BannerService.listarActivos() - Banners recibidos:', response.data.length)
      return response.data
    } catch (error: any) {
      console.error('❌ BannerService.listarActivos() - Error:', error.response?.data || error.message)
      throw error
    }
  }

  /**
   * Listar todos los banners (admin)
   */
  async listarTodos(page = 1, limit = 20, activo?: boolean): Promise<BannerResponse> {
    try {
      console.log('📞 BannerService.listarTodos() - Llamando a API...')
      const params: any = { page, limit }
      if (activo !== undefined) params.activo = activo
      const response = await api.get('/banners', { params })
      console.log('✅ BannerService.listarTodos() - Total:', response.data.total)
      return response.data
    } catch (error: any) {
      console.error('❌ BannerService.listarTodos() - Error:', error.response?.data || error.message)
      throw error
    }
  }

  /**
   * Obtener banner por ID (admin)
   */
  async obtenerPorId(id: number): Promise<Banner> {
    try {
      console.log(`📞 BannerService.obtenerPorId(${id}) - Llamando a API...`)
      const response = await api.get(`/banners/${id}`)
      return response.data
    } catch (error: any) {
      console.error('❌ BannerService.obtenerPorId() - Error:', error.response?.data || error.message)
      throw error
    }
  }

  /**
   * Crear banner (admin)
   */
  async crear(banner: Partial<Banner>): Promise<BannerResponse> {
    try {
      console.log('📞 BannerService.crear() - Enviando datos...', banner)
      const response = await api.post('/banners', banner)
      console.log('✅ BannerService.crear() - Creado correctamente')
      return response.data
    } catch (error: any) {
      console.error('❌ BannerService.crear() - Error:', error.response?.data || error.message)
      throw error
    }
  }

  /**
   * Actualizar banner (admin)
   */
  async actualizar(id: number, banner: Partial<Banner>): Promise<BannerResponse> {
    try {
      console.log(`📞 BannerService.actualizar(${id}) - Llamando a API...`)
      const response = await api.put(`/banners/${id}`, banner)
      console.log('✅ BannerService.actualizar() - Actualizado correctamente')
      return response.data
    } catch (error: any) {
      console.error('❌ BannerService.actualizar() - Error:', error.response?.data || error.message)
      throw error
    }
  }

  /**
   * Activar / desactivar banner (admin)
   */
  async toggleActivo(id: number): Promise<BannerResponse> {
    try {
      console.log(`📞 BannerService.toggleActivo(${id}) - Llamando a API...`)
      const response = await api.patch(`/banners/${id}/toggle`)
      console.log(`✅ BannerService.toggleActivo() - Nuevo estado: ${response.data.activo}`)
      return response.data
    } catch (error: any) {
      console.error('❌ BannerService.toggleActivo() - Error:', error.response?.data || error.message)
      throw error
    }
  }

  /**
   * Actualizar orden de banners (admin)
   */
  async actualizarOrden(banners: { id: number; orden: number }[]): Promise<BannerResponse> {
    try {
      console.log('📞 BannerService.actualizarOrden() - Enviando orden...', banners)
      const response = await api.put('/banners/orden', { banners })
      console.log('✅ BannerService.actualizarOrden() - Orden actualizado')
      return response.data
    } catch (error: any) {
      console.error('❌ BannerService.actualizarOrden() - Error:', error.response?.data || error.message)
      throw error
    }
  }

  /**
   * Eliminar banner (admin)
   */
  async eliminar(id: number): Promise<BannerResponse> {
    try {
      console.log(`📞 BannerService.eliminar(${id}) - Llamando a API...`)
      const response = await api.delete(`/banners/${id}`)
      console.log('✅ BannerService.eliminar() - Eliminado correctamente')
      return response.data
    } catch (error: any) {
      console.error('❌ BannerService.eliminar() - Error:', error.response?.data || error.message)
      throw error
    }
  }
}

export default new BannerService()
