import { ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Column } from "react-table";
import { RootState } from "../redux/store";
import { useMyOrdersQuery } from "../redux/api/orderApi";
import toast from "react-hot-toast";
import { CustomError } from "../types/types";
import Table from "../components/admin/Common/Table";
import Loader from "../components/Loader";

interface ColumnsType {
  _id: string;
  amount: number;
  quantity: number;
  discount: number;
  status: ReactElement;
}

const columns: Column<ColumnsType>[] = [
  {
    Header: "ID",
    accessor: "_id",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Status",
    accessor: "status",
  },
];

function MyOrders() {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const { isLoading, data, isError, error } = useMyOrdersQuery(user?._id!);

  const [rows, setRows] = useState<ColumnsType[]>([]);

  if (isError) {
    const err = error as CustomError;

    toast.error(err.data.message);
  }
  useEffect(() => {
    if (data)
      setRows(
        data.orders.map((i) => ({
          _id: i._id,
          amount: i.total,
          discount: i.discount,
          quantity: i.orderItems.length,
          status: (
            <span
              className={
                i.status === "Processing"
                  ? "text-red-500"
                  : i.status === "Shipped"
                  ? "text-green-500"
                  : "text-purple-500"
              }
            >
              {i.status}
            </span>
          ),
        }))
      );
  }, [data]);

  const OrdersTable = Table<ColumnsType>(
    columns,
    rows,
    "px-3 py-5 m-3",
    "My orders",
    rows.length > 6,
    true
  )();

  return (
    <div className="lg:col-span-4 px-5 py-4 w-full mt-[90px]">
      <div className="mx-3 xsm:rounded xsm:shadow xsm:bg-white relative">
        {isLoading ? <Loader /> : OrdersTable}
        {/* <div className="absolute top-5 right-5 rounded-[100%] bg-black text-white py-1 px-3 text-2xl ">+</div> */}
      </div>
    </div>
  );
}

export default MyOrders;
