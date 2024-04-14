// import PieChart from './PieChart'
import BarChart from "./Graph/BarChart ";
import BasicPie from "./Graph/PieChart";
import SaleBox from "./Graph/SaleBox";
const Dashboard = () => {
  return (
    <>
      {/* <PieChart/> */}
      <dev>
        <SaleBox/>
        <hr />
        <BarChart />
        <BasicPie />
      </dev>
    </>
  );
};

export default Dashboard;
