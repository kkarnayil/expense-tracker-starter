import { formatMoney } from './format'

function Summary({ transactions }) {
  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  let share = 0;
  if (totalIncome > 0) share = Math.min(totalExpenses / totalIncome, 1);
  else if (totalExpenses > 0) share = 1;
  const percent = totalIncome > 0 ? Math.round((totalExpenses / totalIncome) * 100) : null;

  const fig = (value) => <span className="ledger-figure">{formatMoney(value)}</span>;

  let sentence;
  if (totalIncome === 0 && totalExpenses === 0) {
    sentence = <>Nothing logged yet. Add a transaction to see where your money goes.</>;
  } else if (totalIncome === 0) {
    sentence = <>You've spent {fig(totalExpenses)} with no income logged yet.</>;
  } else if (balance >= 0) {
    sentence = <>You've spent {fig(totalExpenses)} of the {fig(totalIncome)} that came in. {fig(balance)} left.</>;
  } else {
    sentence = <>You've spent {fig(totalExpenses)} against {fig(totalIncome)} of income. {fig(-balance)} over.</>;
  }

  return (
    <section className="ledger" aria-label="Balance summary">
      <p className="ledger-sentence">{sentence}</p>
      <div
        className="ledger-bar"
        role="img"
        aria-label={percent === null ? "No income logged" : `${percent}% of income spent`}
      >
        <div
          className={`ledger-bar-fill${balance < 0 ? " is-over" : ""}`}
          style={{ width: `${share * 100}%` }}
        />
      </div>
      {percent !== null && (
        <p className="ledger-note">{percent}% of income spent</p>
      )}
    </section>
  );
}

export default Summary
