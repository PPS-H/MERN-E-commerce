import ProductForm from "../../../components/admin/Products/ProductForm";

function NewProduct() {
  return (
    <div className="col-span-4 place-self-center">
      <div className="bg-white rounded shadow p-5 min-h-[90vh]">
        <h2 className="text-center font-bold text-3xl my-4">New Product</h2>
        <ProductForm btnText="Add Product" />
      </div>
    </div>
  );
}

export default NewProduct;
