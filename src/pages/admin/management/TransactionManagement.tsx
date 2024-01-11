import { useState } from "react";

export type OrderItemType = {
  name: string;
  photo: string;
  price: number;
  quantity: number;
  _id: string;
};

export type OrderType = {
  customerName: string;
  address: string;
  city: string;
  country: string;
  state: string;
  pinCode: number;
  status: "Processing" | "Shipped" | "Delivered";
  subtotal: number;
  discount: number;
  shippingCharges: number;
  tax: number;
  total: number;
  orderItems: OrderItemType[];
  _id: string;
};

const img =
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=804";

const orderItems: OrderItemType[] = [
  {
    name: "Puma Shoes",
    photo: img,
    _id: "asdsaasdas",
    quantity: 4,
    price: 2000,
  },
];

function TransactionManagement() {
  const [order, setOrder] = useState<OrderType>({
    customerName: "Abhishek Singh",
    address: "77 Black Street",
    city: "Neyword",
    state: "Nevada",
    country: "India",
    pinCode: 2434341,
    status: "Processing",
    subtotal: 4000,
    discount: 1200,
    shippingCharges: 0,
    tax: 200,
    total: 4000 + 200 + 0 - 1200,
    orderItems,
    _id: "asdnasjdhbn",
  });
  const {
    customerName,
    address,
    city,
    country,
    state,
    pinCode,
    subtotal,
    shippingCharges,
    tax,
    discount,
    total,
    status,
  } = order;
  return (
    <div className="col-span-4 place-self-center">
      <div className="flex">
        <div className="bg-white rounded shadow px-5 py-8 min-h-[90vh] min-w-[400px] mx-3">
          <h2 className="heading text-2xl">Order Items</h2>
          <div className="flex items-center justify-between my-5">
            {order.orderItems.map((item) => {
              return (
                <>
                  <div>
                    <img
                      src={img}
                      alt="product-image"
                      className="w-[50px] h-[50px] object-contain"
                    />
                  </div>
                  <div>{item.name}</div>
                  <div>{item.price} * {item.quantity} = {item.price*item.quantity}</div>
                </>
              );
            })}
          </div>
        </div>
        <div className="bg-white rounded shadow px-5 py-8 min-h-[90vh] max-w-[400px] mx-3">
          <h2 className="heading text-2xl">Order Info</h2>
          <div className="my-5 px-2 text-md space-y-2">
            <h5 className="font-semibold text-lg">User Info</h5>
            <div className="px-2">
              <p>Name: {customerName}</p>
              <br />
              <p>
                Adderess:{" "}
                {`${address}, ${city}, ${state}, ${country} ${pinCode}`}
              </p>
            </div>
            <h5 className="font-semibold text-lg">Amount Info</h5>
            <div className="px-2">
              <p>Subtotal: {subtotal}</p>
              <p>Shiping Charges: {shippingCharges}</p>
              <p>Tax: {tax} </p>
              <p>Discount: {discount}</p>
              <p>Total: {total}</p>
            </div>
            <h5 className="font-semibold text-lg">Status Info</h5>
            <div className="px-2">
              {" "}
              <p>Status:{status}</p>
            </div>
          </div>

          <button className="btn-primary">Process Status</button>
        </div>
      </div>
    </div>
  );
}

export default TransactionManagement;
