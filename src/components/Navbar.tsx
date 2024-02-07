import { Link } from "react-router-dom";
import { User } from "../types/types";
import { MdLogin, MdLogout } from "react-icons/md";
import { ReactElement, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";
import { IoMdCart } from "react-icons/io";
import { CartReducerInitialState } from "../types/ReducerTypes";
import { useSelector } from "react-redux";
import { HiMenuAlt4 } from "react-icons/hi";

function Navbar({ user }: { user: User | null }) {
  const [phoneActive, setPhoneActive] = useState<boolean>(
    window.innerWidth < 1024
  );
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const handleClick = () => {
    setShowMenu(!showMenu);
  };

  const checkMobileMenu = () => {
    if (phoneActive) setShowMenu(!showMenu);
  };

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
    <>
      {/* {phoneActive && (
        <div className="block h-[50px]">
          <div className="block w-full bg-white p-2 fixed z-40">
            <HiMenuAlt4
              className="rounded-[100%] bg-white text-4xl"
              onClick={handleClick}
            />
          </div>
        </div>
      )} */}

      <div className="w-full flex justify-between bg-white h-[80px] fixed z-50 top-0">
        <img
          src="https://shopo.quomodothemes.website/assets/images/logo.svg"
          alt="logo"
          className="mx-3 my-4 md:block hidden"
        />
        <ul className="flex items-center md:justify-end justify-evenly w-full">
          <Li className="sm:p-2 m-2" text="Home" url="/" />
          <Li className="sm:p-2 m-2" text="Products" url="/products" />
          <Li className="sm:p-2 m-2" text="My orders" url="/myorders" />
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
    </>
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
