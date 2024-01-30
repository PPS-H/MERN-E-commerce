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

export interface CartItem {
  productId: string;
  name: string;
  photo: string;
  price: number;
  quantity: number;
  stock: number;
}
