import { Link } from "react-router-dom";
import { User } from "../types/types";
import { MdLogin, MdLogout } from "react-icons/md";
import { ReactElement } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";
import { IoMdCart } from "react-icons/io";
import { CartReducerInitialState } from "../types/ReducerTypes";
import { useSelector } from "react-redux";

function Navbar({ user }: { user: User | null }) {
  const { cartItems } = useSelector(
    (state: { cartReducer: CartReducerInitialState }) => state.cartReducer
  );

  const logoutHandler = async () => {
    try {
      await signOut(auth);
      toast.success("Sign out successfully");
    } catch (error) {
      toast.error("Unable to sign out");
    }
  };
  return (
    <div className="w-full flex justify-between">
      <img
        src="https://shopo.quomodothemes.website/assets/images/logo.svg"
        alt="logo"
        className="mx-3 my-5"
      />
      <ul className="flex items-center justify-end">
        <Li className="p-2 m-2" text="Home" url="/" />
        <Li className="p-2 m-2" text="Products" url="/products" />
        <Li className="p-2 m-2" text="My orders" url="/myorders" />
        <Li
          className="p-2 m-2 text-2xl relative"
          text={<IoMdCart />}
          url="/cart"
          cartNumber={cartItems.length}
        />
        {user ? (
          <Li
            className="p-2 m-2 text-2xl"
            text={<MdLogout />}
            url=""
            handleClick={logoutHandler}
          />
        ) : (
          <Li className="p-2 m-2 text-2xl" text={<MdLogin />} url="/login" />
        )}
      </ul>
    </div>
  );
}

interface LiProps {
  className: string;
  text: string | ReactElement;
  url: string;
  cartNumber?: number;
  handleClick?: React.MouseEventHandler<HTMLLIElement>;
}
const Li = ({ className, text, url, cartNumber, handleClick }: LiProps) => {
  return (
    <li className={className} onClick={handleClick}>
      {cartNumber && url === "/cart" ? (
        <div className="bg-red-500 text-white rounded-[100%] w-fit px-1 text-xs absolute top-0 right-0">
          {cartNumber}
        </div>
      ) : (
        ""
      )}
      <Link to={url}>{text}</Link>
    </li>
  );
};

export default Navbar;
