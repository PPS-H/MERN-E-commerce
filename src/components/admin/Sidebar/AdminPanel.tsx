import { Link } from "react-router-dom";
import { MdDashboard, MdShoppingCart, MdOutlinePayment } from "react-icons/md";
import { FaUsersGear } from "react-icons/fa6";
import { IconType } from "react-icons";
import { IoBarChartSharp } from "react-icons/io5";
import { FaChartPie } from "react-icons/fa";
import { BsGraphUp } from "react-icons/bs";
import { RiCouponLine } from "react-icons/ri";
import { HiMenuAlt4 } from "react-icons/hi";
import { useState } from "react";

function AdminPanel() {
  const [phoneActive, setPhoneActive] = useState<boolean>(
    window.innerWidth < 1024
  );
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const handleClick = () => {
    setShowMenu(!showMenu);
  };
  return (
    <>
      {phoneActive && (
        <HiMenuAlt4
          className="rounded-[100%] bg-white text-4xl absolute top-5 left-4"
          onClick={handleClick}
        />
      )}

      <div className={`${showMenu?"fixed left-0 ease-in duration-500	w-[50%] z-10":"hidden left-96"} lg:block bg-white px-5 py-4`}>
        <h1 className="text-2xl font-bold">Logo.</h1>
        <div className="xl:px-4 lg:px-2  py-6">
          <div>
            <h5 className="uppercase tracking-widest">DASHBOARD</h5>
            <div className="px-4 py-3">
              <ul>
                <Li
                  url="/admin/dashboard"
                  text="Dashboard"
                  Icon={MdDashboard}
                />
                <Li
                  url="/admin/products"
                  text="Products"
                  Icon={MdShoppingCart}
                />
                <Li
                  url="/admin/customers"
                  text="Customers"
                  Icon={FaUsersGear}
                />
                <Li
                  url="/admin/transactions"
                  text="Transactions"
                  Icon={MdOutlinePayment}
                />
              </ul>
            </div>
          </div>
        </div>
        <div className="xl:px-4 lg:px-2  py-6">
          <div>
            <h5 className="uppercase tracking-widest">CHARTS</h5>
            <div className="px-4 py-3">
              <ul>
                <Li url="/admin/bar" text="Bar" Icon={IoBarChartSharp} />
                <Li url="/admin/pie" text="Pie" Icon={FaChartPie} />
                <Li url="/admin/line" text="Line" Icon={BsGraphUp} />
              </ul>
            </div>
          </div>
          <Li
            url="/admin/coupons"
            text="Generate Coupons"
            Icon={RiCouponLine}
          />
        </div>
      </div>
    </>
  );
}

interface Liprops {
  url: string;
  text: string;
  Icon: IconType;
}
const Li = ({ url, text, Icon }: Liprops) => {
  return (
    <li className="xl:text-lg lg:text-base text-lg flex items-center py-2">
      <Icon />
      <Link to={url} className="ml-2">
        {text}
      </Link>
    </li>
  );
};

export default AdminPanel;
