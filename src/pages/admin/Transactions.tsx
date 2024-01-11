import { ReactElement, useCallback } from "react";
import { Column } from "react-table";
import Table from "../../components/admin/Common/Table";
import { Link } from "react-router-dom";

interface ColumnsType {
  user: string;
  amount: number;
  discount: number;
  quantity: number;
  status: ReactElement;
  action: ReactElement;
}

const arr: ColumnsType[] = [
  {
    user: "Charas",
    amount: 4500,
    discount: 400,
    quantity: 3,
    status: (
      <span
        style={{
          color: "red",
        }}
      >
        Processing
      </span>
    ),
    action: <Link to="/admin/transaction/sajknaskd">Manage</Link>,
  },
  {
    user: "Xavirors",
    amount: 6999,
    discount: 400,
    status: (
      <span
        style={{
          color: "green",
        }}
      >
        Shipped
      </span>
    ),
    quantity: 6,
    action: <Link to="/admin/transaction/sajknaskd">Manage</Link>,
  },
  {
    user: "Xavirors",
    amount: 6999,
    discount: 400,
    status: (
      <span
        style={{
          color: "purple",
        }}
      >
        Delivered
      </span>
    ),
    quantity: 6,
    action: <Link to="/admin/transaction/sajknaskd">Manage</Link>,
  },
];

const columns: Column<ColumnsType>[] = [
  { Header: "User", accessor: "user" },
  { Header: "Amount", accessor: "amount" },
  { Header: "Discount", accessor: "discount" },
  { Header: "Status", accessor: "status" },
  { Header: "Quantity", accessor: "quantity" },
  { Header: "Action", accessor: "action" },
];

function Transactions() {
  const TransactionsTable = useCallback(
    Table<ColumnsType>(columns, arr, "px-3 py-5 m-3", "Transactions", true),
    []
  );
  return (
    <div className="lg:col-span-4 px-5 py-4">
      <div className="mx-3 xsm:rounded xsm:shadow xsm:bg-white">{TransactionsTable()}</div>
    </div>
  );
}

export default Transactions;
