import { Link } from "react-router-dom";
import ProductCard from "../components/Products/ProductCard";
import { useLatestProductsQuery } from "../redux/api/productApi";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

function Home() {
  const { data, isLoading, isError } = useLatestProductsQuery("");

  if(isError) toast.error("Couldn't load products.")
  
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

        <div className="flex flex-wrap items-center justify-center">
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
                  handleClick={() => {}}
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
