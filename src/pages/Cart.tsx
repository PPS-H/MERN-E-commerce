import Input from "../components/admin/Common/Input";

const product = {
  id: 2,
  category: "Mobile and Tablets",
  name: "Iphone 14 pro max 256 gb ssd and 8 gb ram silver colour",
  description:
    "Product details are a crucial part of any eCommerce website or online marketplace. These details help the potential customers to make an informed decision about the product they are interested in buying. A well-written product description can also be a powerful marketing tool that can help to increase sales.Product details typically include information about the product's features, specifications, dimensions, weight, materials, and other relevant information that can help customers to understand the product better. The product details section should also include high-quality images and videos of the product, as well as customer reviews and ratings.",
  image_Url: [
    {
      public_id: "test",
      url: "https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg",
    },
    {
      public_id: "test",
      url: "https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg",
    },
  ],
  shop: {
    name: "Amazon Ltd",
    shop_avatar: {
      public_id: "test",
      url: "https://www.hatchwise.com/wp-content/uploads/2022/05/amazon-logo-1024x683.png",
    },
    ratings: 4.2,
  },
  price: 120,
  discount_price: 1099,
  rating: 5,
  total_sell: 80,
  stock: 10,
};
function Cart() {
  return (
    <div className="grid grid-cols-4 border px-8 py-4">
      <section className="col-span-3 mx-8 my-4 p-4">
        <h2 className="heading text-xl text-left">Orders Summary</h2>
        <div className="flex items-center text-lg justify-between">
          <img
            src={product.image_Url[0].url}
            alt="product-image"
            className="w-[100px] h-[100px]"
          />
          <div className="flex">
          <p>{product.price}*2=</p>
          <p>{product.price*2}</p>
          </div>

          <div className="flex items-center">
            <button className=" bg-slate-300 px-2">-</button>
            <p className="mx-2">1</p>
            <button className=" bg-slate-300 px-2">+</button>
          </div>
        </div>
      </section>
      <section className="flex flex-col justify-center my-4 p-4">
        <h2 className="heading text-xl">Orders Info</h2>
        <div className="flex flex-col justify-between">
          <p className="my-2">Subtotal:</p>
          <p className="my-2">Shipping Charges:</p>
          <p className="my-2">Tax:</p>
          <p className="my-2">Discount:</p>
          <p className="font-bold my-2">Total:</p>
        </div>
        <div className="flex flex-col my-2">
          <input
            type="text"
            name="coupon"
            className="border rounded my-2 px-2 py-2 border-black"
            placeholder="Apply Coupon Code"
            onClick={() => {}}
          />
          <button className="bg-black text-white py-2 rounded">
            Apply Coupon Code
          </button>
        </div>
      </section>
    </div>
  );
}

export default Cart;
