import { useParams } from "react-router-dom";
import ProductForm from "../../../components/admin/Products/ProductForm";
import { useGetSingleProductQuery } from "../../../redux/api/productApi";
import toast from "react-hot-toast";
import { server } from "../../../redux/store";
import Loader from "../../../components/Loader";

function ProductManagement() {
  const { id } = useParams();
  const { data, isError, isLoading } = useGetSingleProductQuery(id!);
console.log(data);

  if (isError) toast.error("Unable to get product details");

  return isLoading ? (
    <Loader />
  ) : (
    <div className="col-span-4 place-self-center">
      <div className="flex">
        <div className="bg-white rounded shadow px-5 py-8 min-h-[90vh] min-w-[400px] mx-3">
          <div
            className={`text-${
              data!.product.stock > 0 ? "green" : "red"
            }-500 text-right block`}
          >
            {data!.product.stock > 0 ? `${data?.product.stock} Available` : ""}
          </div>
          <p className="heading">Top -{data!.product.category}</p>
          <img
            src={`${server}/${data?.product.photo}`}
            alt="product-image"
            className="max-w-[400px] h-[400px] my-5 object-contain"
          />
          <div>
            <p className="heading">{data?.product.name}</p>
            <p className="font-bold text-2xl text-center">
              ${data?.product.price}
            </p>
          </div>
        </div>
        <div className="bg-white rounded shadow p-5 min-h-[90vh] mx-3">
          <h2 className="text-center font-bold text-3xl my-4">
            Manage Product
          </h2>
          {
            <ProductForm
              name={data?.product.name}
              stock={data?.product.stock}
              price={data?.product.price}
              category={
                data!.product.category.charAt(0).toUpperCase() +
                data!.product.category.slice(1)
              }
              btnText="Update Product"
              productId={data?.product._id}
            />
          }
        </div>
      </div>
    </div>
  );
}

export default ProductManagement;
