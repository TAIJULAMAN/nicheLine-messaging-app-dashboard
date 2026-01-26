/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useUserGrowthQuery } from "../../Redux/api/dashboard/dashboardApi";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { month, count } = payload[0].payload;
    return (
      <div className="bg-white shadow-md p-3 rounded-md border text-gray-700">
        <p className="font-medium">Month: {month}</p>
        <p className="font-medium">Users: {count}</p>
      </div>
    );
  }
  return null;
};

const TotalView = ({ year }) => {
  const [chartHeight, setChartHeight] = useState(220);
  const { data: userGrowthData } = useUserGrowthQuery({ year });
  const monthlyStats = userGrowthData?.data?.monthlyStats || [];

  const getMonthName = (monthNum) => {
    const date = new Date();
    date.setMonth(monthNum - 1);
    return date.toLocaleString('default', { month: 'short' });
  };

  const chartData = Array.from({ length: 12 }, (_, i) => {
    const monthNum = i + 1;
    const stat = monthlyStats.find((item) => item.month == monthNum);
    return {
      month: getMonthName(monthNum),
      count: stat ? Number(stat?.count) : 0,
    };
  });

  const maxUserCount = Math.max(...chartData.map((item) => item.count), 10);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 220) {
        setChartHeight(250);
      } else if (window.innerWidth < 768) {
        setChartHeight(220);
      } else {
        setChartHeight(220);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <ResponsiveContainer width="100%" height={chartHeight}>
        <BarChart
          data={chartData}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <XAxis tickLine={false} dataKey="month" className="text-gray-600" />
          <YAxis
            tickLine={false}
            domain={[0, maxUserCount + (maxUserCount * 0.2)]} // Add 20% padding
            className="text-gray-600"
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            barSize={30}
            radius={[5, 5, 0, 0]}
            dataKey="count"
            fill="#00e0b7"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TotalView;
