import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = () => {
  // Dummy data
  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        data: [300, 50, 100, 40, 120, 80],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  options= {
    responsive: true,
    maintainAspectRatio: false,
  }
  return (
    <div>
      <h2>Pie Chart</h2>
      <Pie chartData ={data} chartOptions= {options}/>
    </div>
  );
};

export default PieChart;
