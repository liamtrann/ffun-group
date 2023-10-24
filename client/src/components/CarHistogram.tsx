import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

type TCarHistogram = {
  carStatus: ("live" | "sold")[] | undefined;
};

const CarHistogram = ({ carStatus }: TCarHistogram) => {
  const calculate = (carStatus: string[] | undefined, target: string) => {
    if (!carStatus || !carStatus.length) return 0;
    let count = 0;
    for (let i = 0; i < carStatus.length; i++) {
      if (carStatus[i] === target) {
        count++;
      }
    }
    return count;
  };
  const data = {
    labels: ["Live", "Sold"],
    datasets: [
      {
        label: "Car Status",
        data: [
          (calculate(carStatus, "live") / (carStatus?.length ?? 1)) * 100,
          (calculate(carStatus, "sold") / (carStatus?.length ?? 1)) * 100,
        ],
        backgroundColor: ["#36A2EB", "#FFCE56"],
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  return (
    <div>
      <div className="font-weight-bold">Car Status Histogram</div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default CarHistogram;
