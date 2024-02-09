import { server } from "../redux/store";
import { CartItem } from "../types/types";
import { MdDelete } from "react-icons/md";


type CartItemProps = {
  key: string;
  product: CartItem;
  incrementQuantityHandler: (cartItem: CartItem) => void;
  decrementQuantityHandler: (cartItem: CartItem) => void;
  removeHandler: (id:string) => void;
};

function CartItemCard({
  key,
  product,
  incrementQuantityHandler,
  decrementQuantityHandler,
  removeHandler
}: CartItemProps) {
  return (
    <div className="flex items-center sm:text-lg justify-between text:xs xsm:text-md" key={key}>
      <div className="flex flex-col justify-center items-start">
        <img
          src={`${server}/${product.photo}`}
          alt="product-image"
          className="w-[100px] h-[100px] object-contain mx-auto"
        />
        <p className=" w-[100px] sm:w-[180px] mx-auto text-center">{product.name}</p>
      </div>
      <div className="flex items-start">
        <p>
          {product.price}*{product.quantity}=
        </p>
        <p>{product.price * product.quantity}</p>
      </div>

      <div className="flex items-center">
        <button
          className="bg-slate-300 px-2"
          onClick={() => {
            decrementQuantityHandler(product);
          }}
        >
          -
        </button>
        <p className="mx-2">{product.quantity}</p>
        <button
          className="bg-slate-300 px-2"
          onClick={() => {
            incrementQuantityHandler(product);
          }}
        >
          +
        </button>
        <div className="ml-4 text-2xl" onClick={()=>{removeHandler(product.productId)}}>
        <MdDelete/>
        </div>
      </div>
    </div>
  );
}

export default CartItemCard;
