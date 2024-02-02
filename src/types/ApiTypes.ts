import { CartItem, OrderItem, OrdersType, ShippingInfo, User } from "./types";

export type MessageResponse = {
  success: boolean;
  message: string;
};
export type UserResponse = {
  success: boolean;
  user: User;
};

export interface ProductType {
  _id: string;
  name: string;
  stock: number;
  photo: string;
  category: string;
  price: number;
}

export type ProductsResponse = {
  success: boolean;
  products: ProductType[];
};

export type SingleProductResponse = {
  success: boolean;
  product: ProductType;
};

export interface CustomError {
  status: boolean;
  data: {
    success: boolean;
    message: string;
  };
}

export interface CategoriesType {
  success: boolean;
  categories: string[];
}

export interface SearchProducts {
  category?: string;
  price?: string;
  search?: string;
  sort?: string;
  page?: number;
}

export interface SearchProductsResponse extends ProductsResponse {
  totalPages: number;
}

export interface AddNewProuduct {
  id: string;
  formData: FormData;
}

export interface UpdateProduct {
  userId: string;
  productId: string;
  product: FormData;
}
export interface DeleteProduct {
  userId: string;
  productId: string;
}

export interface NewOrder {
  shippingInfo: ShippingInfo;
  user: string;
  subtotal: number;
  tax: number;
  discount: number;
  shippingCharges: number;
  total: number;
  orderItems: CartItem[];
}

export interface Product {}


export type SingleOrderResponse = {
  success: boolean;
  order: OrdersType;
};

export interface AllOrdersResponse {
  success: boolean;
  orders: OrdersType[];
}
export interface UpdateOrder {
  userId: string;
  orderId: string;
}
