import { Link } from "react-router-dom";
import { User } from "../types/types";
import { MdLogin, MdLogout } from "react-icons/md";
import { ReactElement } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";

function Navbar({ user }: { user: User | null }) {
  // console.log(user)
  const logoutHandler = async () => {
    try {
      await signOut(auth);
      toast.success("Sign out successfully");
    } catch (error) {
      toast.error("Unable to sign out");
    }
  };
  return (
    <div className="w-full">
      <ul className="flex items-center justify-end">
        <Li className="p-2 m-2" text="Home" url="/" />
        <Li className="p-2 m-2" text="Products" url="/products" />
        {user ? (
          <Li className="p-2 m-2 text-2xl" text={<MdLogout />} url="" handleClick={logoutHandler} />
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
  handleClick?: React.MouseEventHandler<HTMLLIElement>;
}
const Li = ({ className, text, url,handleClick }: LiProps) => {

  return (
    <li className={className} onClick={handleClick}>
      <Link to={url}>{text}</Link>
    </li>
  );
};

export default Navbar;
