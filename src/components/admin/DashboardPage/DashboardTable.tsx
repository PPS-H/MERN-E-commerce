import { Column } from "react-table";
import Table from "../Common/Table";

interface ColumnsType {
  id: string;
  quantity: number;
  discount: number;
  amount: number;
  status: string;
}

const columns: Column<ColumnsType>[] = [
  { Header: "Id", accessor: "id" },
  { Header: "Quanitty", accessor: "quantity" },
  { Header: "Discount", accessor: "discount" },
  { Header: "Amount", accessor: "amount" },
  { Header: "Status", accessor: "status" },
];

function DashboardTable({ data }: { data: ColumnsType[] }) {
  return Table<ColumnsType>(columns, data, "px-3 py-5 m-3", "Top Transaction")();
}

export default DashboardTable;
