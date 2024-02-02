export interface User {
  name: string;
  email: string;
  dob: string;
  photo: string;
  _id: string;
  gender: string;
  role: string;
}

export interface ShippingInfo {
  address: string;
  city: string;
  pincode: string;
  state: string;
  country: string;
}

export type CartItem = {
  productId: string;
  name: string;
  photo: string;
  price: number;
  quantity: number;
  stock: number;
};
export type OrderItem = Omit<CartItem, "stock"> & { _id: string };

export type OrdersType = {
  orderItems: OrderItem[];
  shippingInfo: ShippingInfo;
  subtotal: number;
  tax: number;
  discount: number;
  shippingCharges: number;
  total: number;
  status: string;
  _id: string;
  user: {
    name: string;
    _id: string;
  };
};
