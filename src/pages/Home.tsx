import { Link } from "react-router-dom";
import ProductCard from "../components/Products/ProductCard";
import { useLatestProductsQuery } from "../redux/api/productApi";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import { CartItem } from "../types/types";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, calculatePrice } from "../redux/reducer/cartReducer";
import { CartReducerInitialState } from "../types/ReducerTypes";

function Home() {
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useLatestProductsQuery("");

  if (isError) toast.error("Couldn't load products.");

  const { cartItems } = useSelector(
    (state: { cartReducer: CartReducerInitialState }) => state.cartReducer
  );

  const handleAddToCart = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of stock");
    dispatch(addToCart(cartItem));
    dispatch(calculatePrice());
    toast.success("Added to cart");
  };

  return (
    <div>
      {/* background image  */}
      <section></section>
      {/* Products  */}
      <main className="m-4 px-4 py-2">
        <div className="flex items-center justify-between">
          <h1 className="heading text-2xl">Latest Products</h1>
          <Link to="/products" className="text-lg">
            More
          </Link>
        </div>

        <div className="w-full flex justify-between items-center flex-wrap">
          {isLoading ? (
            <Loader />
          ) : (
            data?.products.map((item) => {
              return (
                <div key={String(item._id)}>
                  <ProductCard
                    name={item.name}
                    price={item.price}
                    stock={item.stock}
                    image={item.photo}
                    id={String(item._id)}
                    handleClick={() => {
                      handleAddToCart({
                        productId: item._id,
                        name: item.name,
                        price: item.price,
                        photo: item.photo,
                        quantity: 1,
                        stock: item.stock,
                      });
                    }}
                  />
                </div>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
}

export default Home;
