import { BarChart, Bar, XAxis, YAxis, LabelList, ResponsiveContainer } from 'recharts';
import { formatCategory, formatMoney } from './format';

const INK = "#12342c";
const MUTED = "#587068";
const ROW_HEIGHT = 34;

function SpendingChart({ transactions }) {
  const totals = {};
  transactions
    .filter(t => t.type === "expense")
    .forEach(t => {
      totals[t.category] = (totals[t.category] || 0) + t.amount;
    });

  const data = Object.entries(totals)
    .map(([category, total]) => ({ category: formatCategory(category), total }))
    .sort((a, b) => b.total - a.total);

  return (
    <section className="spending-chart" aria-labelledby="chart-heading">
      <h2 id="chart-heading">Spending by category</h2>
      {data.length === 0 ? (
        <p className="chart-empty">Expenses you add will be grouped here by category.</p>
      ) : (
        <ResponsiveContainer width="100%" height={data.length * ROW_HEIGHT + 8}>
          <BarChart data={data} layout="vertical" margin={{ top: 4, right: 64, bottom: 4, left: 0 }}>
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="category"
              width={96}
              tick={{ fontSize: 13, fill: MUTED }}
              axisLine={false}
              tickLine={false}
            />
            <Bar dataKey="total" fill={INK} radius={[0, 3, 3, 0]} barSize={14} isAnimationActive={false}>
              <LabelList
                dataKey="total"
                position="right"
                formatter={formatMoney}
                style={{ fontSize: 13, fill: INK, fontWeight: 600 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </section>
  );
}

export default SpendingChart
