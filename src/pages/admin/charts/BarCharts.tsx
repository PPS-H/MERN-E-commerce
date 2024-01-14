import { BarChart } from "../../../components/admin/Common/Charts";
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
function BarCharts() {
  return (
    <div className="lg:col-span-4 overflow-y-scroll">
      <div className="bg-white col-span-3 xsm:rounded xsm:shadow sm:px-8 sm:py-7 p-4 xsm:m-3 sm:m-6  space-y-6">
        <h2 className="font-bold text-3xl">Bar Charts</h2>
        <BarChart
          data_1={[200, 444, 343, 556, 778, 455, 990]}
          data_2={[300, 144, 433, 655, 237, 755, 190]}
          title_1="Products"
          title_2="Users"
          bg_color1={`hsl(260,50%,30%)`}
          bg_color2={`hsl(360,90%,90%)`}
        />
        <h2 className="heading">Top Selling Products & Top Customers</h2>

        <BarChart
          horizontal={true}
          data_1={[200, 444, 343, 556, 778, 455, 990, 444, 122, 334, 890, 909]}
          data_2={[]}
          title_1="Products"
          title_2=""
          bg_color1={`hsl(180, 40%, 50%)`}
          bg_color2=""
          labels={months}
        />
        <h2 className="heading">Orders throughout the year</h2>
      </div>
    </div>
  );
}

export default BarCharts;
