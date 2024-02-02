import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { OrdersType } from "../../../types/types";
import {
  useDeleteOrderMutation,
  useGetOrderDetailsQuery,
  useUpdateOrderMutation,
} from "../../../redux/api/orderApi";
import { useNavigate, useParams } from "react-router-dom";
import { server } from "../../../redux/store";
import { UserReducerInitialState } from "../../../types/ReducerTypes";
import { useSelector } from "react-redux";
import { responseToast } from "../../../components/utils/features";
import OrderedProductCard from "../../../components/OrderedProductCard";

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
  const defaultData: OrdersType = {
    shippingInfo: {
      address: "",
      city: "",
      pincode: "",
      state: "",
      country: "",
    },
    subtotal: 0,
    shippingCharges: 0,
    tax: 0,
    discount: 0,
    total: 0,
    status: "",
    orderItems: [],
    _id: "",
    user: {
      name: "",
      _id: "",
    },
  };

  const [order, setOrder] = useState<OrdersType>();
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );
  const { data, isLoading, isError } = useGetOrderDetailsQuery(id!);
  if (isError) toast.error("Unable to fetch order details");

  useEffect(() => {
    if (data) {
      setOrder({
        orderItems: data.order.orderItems,
        shippingInfo: data.order.shippingInfo,
        subtotal: data.order.subtotal,
        tax: data.order.tax,
        discount: data.order.discount,
        shippingCharges: data.order.shippingCharges,
        total: data.order.total,
        status: data.order.status,
        _id: data.order._id,
        user: data.order.user,
      });
    }
  }, [data]);
  const [updateOrder] = useUpdateOrderMutation();
  const [deleteOrder] = useDeleteOrderMutation();

  const changeStatus = async () => {
    try {
      const res = await updateOrder({
        userId: user!._id,
        orderId: data!.order._id,
      });
      responseToast(res, navigate, "/admin/transactions");
    } catch (error) {
      toast.error("Failed to change the order status");
    }
  };

  const handleDeleteOrder = async () => {
    try {
      const res = await deleteOrder({
        userId: user!._id,
        orderId: data!.order._id,
      });
      responseToast(res, navigate, "/admin/transactions");
    } catch (error) {
      toast.error("Failed to delete order");
    }
  };

  const {
    shippingInfo: { address, city, pincode, state, country },
    subtotal,
    shippingCharges,
    tax,
    discount,
    total,
    status,
    user: { name },
  } = order || defaultData;

  return (
    <div className="col-span-4 place-self-center">
      <div className="flex">
        <div className="bg-white rounded shadow px-5 py-8 min-h-[90vh] min-w-[400px] mx-3">
          <h2 className="heading text-2xl">Order Items</h2>
          <div className="flex items-center justify-between my-5">
            {order?.orderItems.map((item) => {
              return (
                <OrderedProductCard
                  key={item._id}
                  name={item.name}
                  price={item.price}
                  photo={item.photo}
                  quantity={item.quantity}
                  productId={item.productId}
                  _id={item._id}
                />
              );
            })}
          </div>
        </div>
        <div className="bg-white rounded shadow px-5 py-8 min-h-[90vh] max-w-[400px] mx-3">
          <h2 className="heading text-2xl">Order Info</h2>
          <div className="my-5 px-2 text-md space-y-2">
            <h5 className="font-semibold text-lg">User Info</h5>
            <div className="px-2">
              <p>Name: {name}</p>
              <p>
                Adderess:{" "}
                {`${address}, ${city}, ${state}, ${country} ${pincode}`}
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
              <p>Status: {status}</p>
            </div>
          </div>

          <button className="btn-primary" onClick={changeStatus}>
            Process Status
          </button>
          <button
            className="btn-primary bg-red-600 mt-0"
            onClick={handleDeleteOrder}
            type="button"
          >
            Delete Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default TransactionManagement;
