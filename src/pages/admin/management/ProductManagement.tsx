import ProductForm from "../../../components/admin/Products/ProductForm";

function ProductManagement() {
  return (
    <div className="col-span-4 place-self-center">
      <div className="flex">
        <div className="bg-white rounded shadow px-5 py-8 min-h-[90vh] min-w-[400px] mx-3">
          <div className=" text-green-500 text-right block">45 Available</div>
          <p>ID - jhdesfuyhkswdhjha</p>
          <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=804" alt="product-image" className="max-w-[400px] h-[400px] my-5 object-contain"/>
          <div>
            <p className="heading">Puma Shoes</p>
            <p className="font-bold text-2xl text-center">$32156</p>
          </div>
        </div>
        <div className="bg-white rounded shadow p-5 min-h-[90vh] mx-3">
          <h2 className="text-center font-bold text-3xl my-4">
            Manage Product
          </h2>
          <ProductForm
            name="demo"
            stock={45}
            price={65462}
            photo="demo.jpg"
            btnText="Update Product"
          />
        </div>
      </div>
    </div>
  );
}

export default ProductManagement;
