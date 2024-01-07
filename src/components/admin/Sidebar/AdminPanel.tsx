import { Link } from "react-router-dom";
import { MdDashboard, MdShoppingCart, MdOutlinePayment } from "react-icons/md";
import { FaUsersGear } from "react-icons/fa6";
import { IconType } from "react-icons";
import { IoBarChartSharp } from "react-icons/io5";
import { FaChartPie } from "react-icons/fa";
import { BsGraphUp } from "react-icons/bs";




function AdminPanel() {
  return (
    <div className="bg-white px-5 py-4">
      <h1 className="text-2xl font-bold">Logo.</h1>
      <div className="px-4 py-6">
        <div>
          <h5 className="uppercase tracking-widest">DASHBOARD</h5>
          <div className="px-4 py-3">
            <ul>
              <Li url="/admin/dashboard" text="Dashboard" Icon={MdDashboard} />
              <Li url="/admin/products" text="Products" Icon={MdShoppingCart} />
              <Li url="/admin/customers" text="Customers" Icon={FaUsersGear} />
              <Li
                url="/admin/transactions"
                text="Transactions"
                Icon={MdOutlinePayment}
              />
            </ul>
          </div>
        </div>
      </div>
      <div className="px-4 py-6">
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
      </div>
    </div>
  );
}

interface Liprops {
  url: string;
  text: string;
  Icon: IconType;
}
const Li = ({ url, text, Icon }: Liprops) => {
  return (
    <li className="text-lg flex items-center py-2">
      <Icon />
      <Link to={url} className="ml-2">
        {text}
      </Link>
    </li>
  );
};

export default AdminPanel;
