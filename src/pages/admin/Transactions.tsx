import { ReactElement, useCallback, useEffect, useState } from "react";
import { Column } from "react-table";
import Table from "../../components/admin/Common/Table";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserReducerInitialState } from "../../types/ReducerTypes";
import { useAllOrdersQuery } from "../../redux/api/orderApi";
import toast from "react-hot-toast";
import Loader from "../../components/Loader";

interface ColumnsType {
  user: string;
  amount: number;
  discount: number;
  quantity: number;
  status: ReactElement;
  action: ReactElement;
}

const columns: Column<ColumnsType>[] = [
  { Header: "User", accessor: "user" },
  { Header: "Amount", accessor: "amount" },
  { Header: "Discount", accessor: "discount" },
  { Header: "Status", accessor: "status" },
  { Header: "Quantity", accessor: "quantity" },
  { Header: "Action", accessor: "action" },
];

function Transactions() {
  const [rows, setRows] = useState<ColumnsType[]>([]);
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );
  const { data, isLoading, isError } = useAllOrdersQuery(user!._id);
  console.log(data);

  if (isError) toast.error("Couldn't find orders");

  useEffect(() => {
    if (data) {
      setRows(
        data?.orders.map((item) => ({
          user: item.user.name,
          amount: item.total,
          discount: item.discount,
          quantity: item.orderItems.length,
          status: (
            <span
              style={{
                color:
                  item.status == "Processing"
                    ? "red"
                    : item.status == "Shipped"
                    ? "green"
                    : "purple",
              }}
            >
              {item.status}
            </span>
          ),
          action: <Link to={`/admin/transaction/${item._id}`}>Manage</Link>,
        }))
      );
    }
  }, [data]);

  const TransactionsTable = Table<ColumnsType>(
    columns,
    rows,
    "px-3 py-5 m-3",
    "Transactions",
    rows.length > 6,
    true
  )();
  return (
    <div className="lg:col-span-4 px-5 py-4">
      <div className="mx-3 xsm:rounded xsm:shadow xsm:bg-white">
        {isLoading ? <Loader width="100%" length={30} /> : TransactionsTable}
      </div>
    </div>
  );
}

export default Transactions;
