import { useState } from 'react'
import { formatCategory, formatDate, formatMoney } from './format'

const typeFilters = [["all", "All"], ["income", "Income"], ["expense", "Expenses"]];

function TransactionList({ transactions, categories, onDelete }) {
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  let filteredTransactions = transactions;
  if (filterType !== "all") {
    filteredTransactions = filteredTransactions.filter(t => t.type === filterType);
  }
  if (filterCategory !== "all") {
    filteredTransactions = filteredTransactions.filter(t => t.category === filterCategory);
  }
  const sorted = [...filteredTransactions].sort(
    (a, b) => b.date.localeCompare(a.date) || b.id - a.id
  );

  const handleDeleteClick = (t) => {
    if (window.confirm(`Delete "${t.description}"?`)) {
      onDelete(t.id);
    }
  };

  const clearFilters = () => {
    setFilterType("all");
    setFilterCategory("all");
  };

  return (
    <section className="register" aria-labelledby="register-heading">
      <div className="register-head">
        <h2 id="register-heading">Transactions</h2>
        <div className="filters">
          <div className="segmented" role="group" aria-label="Filter by type">
            {typeFilters.map(([value, label]) => (
              <button
                key={value}
                type="button"
                aria-pressed={filterType === value}
                onClick={() => setFilterType(value)}
              >
                <span>{label}</span>
              </button>
            ))}
          </div>
          <label className="visually-hidden" htmlFor="filter-category">Filter by category</label>
          <select
            id="filter-category"
            className="select-compact"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="all">All categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{formatCategory(cat)}</option>
            ))}
          </select>
        </div>
      </div>

      {sorted.length === 0 ? (
        <div className="register-empty">
          {transactions.length === 0 ? (
            <p>No transactions yet. Add one to start your register.</p>
          ) : (
            <>
              <p>No transactions match these filters.</p>
              <button type="button" className="button-quiet" onClick={clearFilters}>Clear filters</button>
            </>
          )}
        </div>
      ) : (
        <table>
          <thead className="visually-hidden">
            <tr>
              <th scope="col">Transaction</th>
              <th scope="col">Amount</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map(t => (
              <tr key={t.id}>
                <td>
                  <span className="row-title">{t.description}</span>
                  <span className="row-meta">
                    <span>{formatCategory(t.category)}</span>
                    <time dateTime={t.date}>{formatDate(t.date)}</time>
                  </span>
                </td>
                <td className={`row-amount${t.type === "income" ? " is-income" : ""}`}>
                  {t.type === "income" ? "+" : "−"}{formatMoney(t.amount)}
                </td>
                <td className="row-action">
                  <button
                    type="button"
                    className="delete-btn"
                    aria-label={`Delete ${t.description}`}
                    onClick={() => handleDeleteClick(t)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default TransactionList
