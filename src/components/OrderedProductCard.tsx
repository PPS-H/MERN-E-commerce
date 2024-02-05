import { server } from "../redux/store";
import { OrderItem } from "../types/types";

function OrderedProductCard({ photo, name, price, quantity }: OrderItem) {
  return (
    <>
      <div>
        <img
          src={`${server}/${photo}`}
          alt="product-image"
          className="w-[50px] h-[50px] object-contain"
        />
      </div>
      <div>{name}</div>
      <div>
        {price} * {quantity} = {price * quantity}
      </div>
    </>
  );
}

export default OrderedProductCard;
