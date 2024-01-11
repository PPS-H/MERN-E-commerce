import { useState } from "react";
import Input from "../Common/Input";

interface ProductProps {
  name?: string;
  price?: number;
  stock?: number;
  photo?: string;
  btnText?: string;
}
function ProductForm({ name, price, stock, photo, btnText }: ProductProps) {
  const [values, setValues] = useState<ProductProps>({
    name: name || "",
    price: price || 0,
    stock: stock || 0,
    photo: photo || "",
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
        <button className="btn-primary">
          {btnText}
        </button>
      </div>
    </form>
  );
}

export default ProductForm;
