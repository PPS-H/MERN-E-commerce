import { useState } from "react";
import Input from "../../../components/admin/Common/Input";

interface ProductProps {
  name: string;
  price: number;
  stock: number;
  photo: string;
}
function NewProduct() {
  const [values, setValues] = useState<ProductProps>({
    name: "",
    price: 0,
    stock: 0,
    photo: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name == "stock" || e.target.name == "price") {
      setValues({ ...values, [e.target.name]: Number(e.target.value) });
    } else if (e.target.name == "photo") {
      const file: File | undefined = e.target.files?.[0];

      const reader: FileReader = new FileReader();

      if (file) {
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          if (typeof reader.result === "string")
            try {
              setValues({ ...values, [e.target.name]: reader.result });
            } catch (error) {
              console.log(error);
            }
        };
      }
    } else {
      setValues({ ...values, [e.target.name]: e.target.value });
    }
  };
  return (
    <div className="col-span-4 place-self-center">
      <div className="bg-white rounded shadow p-5 min-h-[90vh]">
        <h2 className="text-center font-bold text-3xl my-4">New Product</h2>
        <form>
          <div className="flex justify-center flex-col min-w-[400px]">
            <Input
              type="text"
              id="name"
              name="name"
              value={values.name}
              labelText="Name"
              classesForLabel="block my-2"
              classesForInput="rounded border border-solid px-3 py-2 w-full"
              placeholder="Enter product name"
              handleChange={handleChange}
            />
            <Input
              type="text"
              id="price"
              name="price"
              value={values.price}
              labelText="Price"
              classesForLabel="block my-2"
              classesForInput="rounded border border-solid px-3 py-2 w-full"
              placeholder="Enter price name"
              handleChange={handleChange}
            />
            <Input
              type="text"
              id="stock"
              name="stock"
              value={values.stock}
              labelText="Stock"
              classesForLabel="block my-2"
              classesForInput="rounded border border-solid px-3 py-2 w-full"
              handleChange={handleChange}
              placeholder="Enter stock name"
            />
            <Input
              type="file"
              id="photo"
              name="photo"
              labelText="Photo"
              classesForLabel="block my-2"
              classesForInput="rounded border border-solid px-3 py-2 w-full"
              handleChange={handleChange}
            />

            {values.photo && (
              <div className="w-full">
                <img
                  src={values.photo}
                  alt="product-image"
                  className="w-[150px] h-[150px] object-cover block mx-auto"
                />
              </div>
            )}
            <button className="bg-black text-white w-full rounded my-5 py-2">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewProduct;
