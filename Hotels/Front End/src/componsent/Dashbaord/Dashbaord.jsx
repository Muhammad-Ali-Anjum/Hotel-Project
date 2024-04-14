// import PieChart from './PieChart'
import BarChart from "./Graph/BarChart ";
import BasicPie from "./Graph/PieChart";
import BoxSystemProps from "./Graph/Box";
const Dashboard = () => {
  return (
    <>
      {/* <PieChart/> */}
      <dev>
        <BoxSystemProps/>
        <hr />
        <BarChart />
        <BasicPie />
      </dev>
    </>
  );
};

export default Dashboard;
