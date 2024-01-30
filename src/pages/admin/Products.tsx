import { ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import Table from "../../components/admin/Common/Table";
import { useAllProductsQuery } from "../../redux/api/productApi";
import toast from "react-hot-toast";
import { server } from "../../redux/store";
import Loader from "../../components/Loader";
import { useSelector } from "react-redux";
import { UserReducerInitialState } from "../../types/ReducerTypes";
import { CiEdit } from "react-icons/ci";

interface ColumnsType {
  photo: ReactElement;
  name: string;
  price: number;
  stock: number;
  action: ReactElement;
}

const columns: Column<ColumnsType>[] = [
  {
    Header: "Photo",
    accessor: "photo",
    Cell: ({ value }) => <div style={{ width: "60px" }}>{value}</div>,
  },
  { Header: "Name", accessor: "name" },
  { Header: "Price", accessor: "price" },
  { Header: "Stock", accessor: "stock" },
  { Header: "Action", accessor: "action" },
];

function Products() {
  const [rows, setRows] = useState<ColumnsType[]>([]);
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );
  const { data, isError, isLoading } = useAllProductsQuery(user!._id);
  console.log(data);
  if (isError) toast.error("Couldn't find products");

  useEffect(() => {
    if (data)
      setRows(
        data?.products.map((item) => ({
          photo: <img src={`${server}/${item.photo}`} alt="product-image" className="w-[60px] h-[60px] object-fit" />,
          name: item.name,
          price: Number(item.price),
          stock: Number(item.stock),
          action: <Link to={`/admin/product/${item._id}`} className="text-3xl"><CiEdit/></Link>,
        }))
      );
  }, [data]);

  const ProductsTable = Table<ColumnsType>(
    columns,
    rows,
    "px-3 py-5 m-3",
    "Products",
    rows.length > 6,
    true
  )();

  return (
    <div className="lg:col-span-4 px-5 py-4 w-full">
      <div className="mx-3 xsm:rounded xsm:shadow xsm:bg-white relative">
        {isLoading ? <Loader width="100%" length={30} /> : ProductsTable}
        {/* <div className="absolute top-5 right-5 rounded-[100%] bg-black text-white py-1 px-3 text-2xl ">+</div> */}
        <Link
          className="absolute top-8 right-5 bg-black text-white rounded px-3 py-2 font-semibold"
          to="new"
        >
          Add More
        </Link>
      </div>
    </div>
  );
}

export default Products;
