export interface CategoryDto {
  id: number;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  display_order: number;
}

export interface ProductDto {
  id: number;
  category_id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  image_url: string;
  stock: number;
  is_featured: boolean;
  is_new: boolean;
}

export interface OrderCreateDto {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  items: Array<{ product_id: number; quantity: number }>;
}

const json = (res: Response) => {
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
};

export const Api = {
  async listCategories(): Promise<CategoryDto[]> {
    return fetch('/api/categories').then(json);
  },
  async listProducts(params?: { category_slug?: string; is_featured?: boolean; is_new?: boolean; search?: string }): Promise<ProductDto[]> {
    const url = new URL('/api/products', window.location.origin);
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        if (typeof v !== 'undefined' && v !== null && v !== '') {
          url.searchParams.set(k, String(v));
        }
      });
    }
    return fetch(url.toString()).then(json);
  },
  async getProductBySlug(slug: string): Promise<ProductDto> {
    return fetch(`/api/products/slug/${slug}`).then(json);
  },
  async createOrder(payload: OrderCreateDto) {
    return fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).then(json);
  }
};
