export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: 'buyer' | 'seller' | 'admin';
  isVerified: boolean;
  isActive: boolean;
  addresses: Address[];
  createdAt: string;
}

export interface Address {
  _id: string;
  label: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  isDefault: boolean;
}

export interface Product {
  _id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  images: string[];
  videos?: string[];
  category: Category;
  subcategory?: Category;
  brand?: string;
  sku: string;
  price: number;
  comparePrice?: number;
  stock: number;
  variants: ProductVariant[];
  tags: string[];
  rating: number;
  totalReviews: number;
  totalSold: number;
  isActive: boolean;
  isFeatured: boolean;
  status: 'draft' | 'active' | 'inactive' | 'outOfStock';
  store: StoreBasic;
  seller: string;
  estimatedDelivery?: string;
  specifications?: { key: string; value: string }[];
  faq?: { question: string; answer: string }[];
  createdAt: string;
}

export interface ProductVariant {
  name: string;
  sku: string;
  price: number;
  comparePrice?: number;
  stock: number;
  attributes: Record<string, string>;
  images?: string[];
  isActive: boolean;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  icon?: string;
  parent?: string;
  level: number;
  children?: Category[];
}

export interface StoreBasic {
  _id: string;
  name: string;
  slug: string;
  logo?: string;
  rating?: number;
}

export interface Store extends StoreBasic {
  description: string;
  banner?: string;
  status: 'pending' | 'approved' | 'rejected' | 'suspended';
  totalReviews: number;
  totalProducts: number;
  totalSales: number;
  policies?: {
    returnPolicy?: string;
    shippingPolicy?: string;
  };
}

export interface CartItem {
  _id: string;
  product: Product;
  variant?: string;
  quantity: number;
  price: number;
}

export interface Cart {
  _id: string;
  user: string;
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  discount: number;
}

export interface Order {
  _id: string;
  orderNumber: string;
  buyer: string;
  items: OrderItem[];
  shippingAddress: Address;
  paymentMethod: 'stripe' | 'cod' | 'jazzcash' | 'easypaisa';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  subtotal: number;
  shippingFee: number;
  tax: number;
  discount: number;
  total: number;
  status: string;
  createdAt: string;
}

export interface OrderItem {
  product: string;
  seller: string;
  store: string;
  title: string;
  image: string;
  variant?: string;
  quantity: number;
  price: number;
  total: number;
  status: string;
  trackingNumber?: string;
}

export interface Review {
  _id: string;
  product: string;
  user: { firstName: string; lastName: string; avatar?: string };
  rating: number;
  title?: string;
  comment: string;
  images?: string[];
  isVerifiedPurchase: boolean;
  sellerReply?: { message: string; repliedAt: string };
  createdAt: string;
}

export interface Notification {
  _id: string;
  title: string;
  message: string;
  type: 'order' | 'payment' | 'discount' | 'message' | 'system' | 'stock' | 'review';
  link?: string;
  isRead: boolean;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  pagination?: {
    total: number;
    page: number;
    limit: number;
    pages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}
