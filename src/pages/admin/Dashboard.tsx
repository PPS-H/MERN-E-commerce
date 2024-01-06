import { CiSearch } from "react-icons/ci";
import { BiMaleFemale } from "react-icons/bi";
import userImg from "../../assets/userpic.png";
import { HiTrendingUp, HiTrendingDown } from "react-icons/hi";
import { BarChart, DoughnutChart } from "../../components/admin/Common/Charts";
import DashboardTable from "../../components/DashboardPage/DashboardTable";
import  data from "../../assets/data.json";

function Dashboard() {
  return (
    <div className="col-span-4 px-5 py-4">
      {/* top search bar*/}
      <div className="flex items-center justify-between relative">
        <CiSearch className="absolute top-3 left-2" />
        <input
          type="text"
          placeholder="Search for data, users and docs"
          className="w-[90%] p-2 bg-transparent pl-8 outline-none"
        />
        <img src={userImg} alt="user-image" className="w-[30px] h-[30px]" />
      </div>
      <hr />

      {/* stats */}
      <div className="grid grid-cols-4">
        <WebsiteStats
          type="Revenue"
          value="$340000"
          percentage={14}
          color="rgb(180 83 9)"
        />
        <WebsiteStats
          type="Users"
          value="200"
          percentage={-14}
          color="rgb(87, 224, 74)"
        />
        <WebsiteStats
          type="Transactions"
          value="25000"
          percentage={30}
          color="rgb(44, 151, 222)"
        />
        <WebsiteStats
          type="Products"
          value="3000"
          percentage={25}
          color="rgb(189, 177, 53)"
        />
      </div>

      {/* Charts and Inventory section  */}
      <section className="grid grid-cols-4 ">
        <div className="bg-white col-span-3 rounded shadow px-8 py-7 m-3">
          <div className="flex justify-center  items-center flex-col">
            <h5 className="text-gray-400 tracking-widest text-lg capitalize">
              REVENUE & TRANSACTION
            </h5>
            <BarChart
              data_1={[300, 244, 378, 426, 584, 658, 546]}
              data_2={[754, 812, 91, 412, 213, 512, 746]}
              bg_color1="rgb(0,155,255)"
              bg_color2="rgb(53,162,235,0.8)"
              title_1="Revenue"
              title_2="Transaction"
            />
          </div>
        </div>

        <div className="bg-white rounded shadow px-3 py-5 m-3">
          <h5 className="text-gray-400 tracking-widest text-md capitalize text-center">
            INVENTORY
          </h5>
          <div className="flex justify-around items-center my-4">
            <div className="text-xs">Laptops</div>
            <div className="w-[50%] h-[5px] bg-gray-200 rounded">
              <div className="w-[40%] h-[5px] bg-red-400 rounded"></div>
            </div>
            <div className="text-xs">40%</div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-4">
        <div className="bg-white rounded shadow relative px-3 py-5 m-3">
        <h5 className="text-gray-400 tracking-widest text-lg capitalize text-center my-1">
              GENDER RATIO
            </h5>
          <DoughnutChart
            labels={["Female", "Male"]}
            data={[12, 19]}
            backgroundColor={["red", "green"]}
            cutout={90}
          />
          <BiMaleFemale className="absolute left-0 right-0 mx-auto top-0 bottom-0 my-auto text-3xl"/>
        </div>
        <div className="col-span-3 m-3 rounded shadow bg-white">
          <DashboardTable data={data.transaction}/>
           </div>
      </div>
    </div>
  );
}

interface Stats {
  type: string;
  value: string;
  percentage: number;
  color: string;
}

const WebsiteStats = ({ type, value, percentage, color }: Stats) => {
  return (
    <div className="flex items-center justify-between bg-white rounded shadow px-3 py-5 m-3">
      <div className="p-2">
        <h5 className=" text-gray-400">{type}</h5>
        <div className="text-2xl font-bold my-1">{value}</div>
        <div className="flex items-center">
          {percentage > 0 ? (
            <HiTrendingUp className="text-green-500" />
          ) : (
            <HiTrendingDown className="text-red-500" />
          )}
          <div className={`text-${percentage > 0 ? "green" : "red"}-500`}>
            {percentage > 0 ? `+${percentage}` : `${percentage}`}
          </div>
        </div>
      </div>
      <div
        className="h-[70px] w-[70px] rounded-[100%] flex justify-center items-center"
        style={{
          background: `conic-gradient(${color},${
            (Math.abs(percentage) / 100) * 360
          }deg,rgb(255, 255, 255) 0)`,
        }}
      >
        <div className="bg-white h-[80%] w-[80%] rounded-[100%] flex justify-center items-center">
          <div className={`text-${percentage > 0 ? "green" : "red"}-500`}>
            {percentage > 0 ? `+${percentage}` : `${percentage}`}%
          </div>
        </div>
      </div>
    </div>
  );
};

interface InventoryProps {
  category: string;
  value: number;
}

const InventoryItem = ({ category, value }: InventoryProps) => {
  return (
    <div className="flex justify-around items-center my-4">
      <div className="text-xs">{category}</div>
      <div className="w-[50%] h-[5px] bg-gray-200 rounded">
        <div className="w-[40%] h-[5px] bg-red-400 rounded"></div>
      </div>
      <div className="text-xs">{value}%</div>
    </div>
  );
};

export default Dashboard;
