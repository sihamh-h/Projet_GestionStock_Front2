import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
} from "recharts";

export default function Graph({ chartData, chartConfig }) {
  return (

     

      
   <div className="relative z-10">
   <ResponsiveContainer width="100%" height={180}>
                  <LineChart
                    data={chartData}
                    margin={{ top: 8, right: 4, left: -18, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="4 4" stroke="rgba(255,255,255,0.4)" />
                    <XAxis
                      dataKey="label"
                      tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        background: "rgba(30, 41, 59, 0.8)",
                        border: "1px solid rgba(71, 85, 105, 0.5)",
                        borderRadius: "10px",
                        color: "#e2e8f0",
                      }}
                    />

                    {chartConfig.threshold && (
                      <ReferenceLine
                        y={chartConfig.threshold}
                        stroke="#D4791A"
                        strokeDasharray="5 5"
                      />
                    )}

                    {chartConfig.series.map((serie) => (
                      <Line
                        key={serie.name}
                        type="monotone"
                        dataKey={serie.name}
                        stroke={serie.color}
                        strokeWidth={2.5}
                        dot={false}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
                </div>
    
  );
}
