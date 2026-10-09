import { useState } from 'react'
import { formatCategory } from './format'

const types = [["expense", "Expense"], ["income", "Income"]];

function AddTransaction({ categories, onAdd }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("food");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount) return;

    onAdd({
      id: Date.now(),
      description,
      amount: Number(amount),
      type,
      category,
      date: new Date().toISOString().split('T')[0],
    });

    setDescription("");
    setAmount("");
    setType("expense");
    setCategory("food");
  };

  return (
    <section className="slip" aria-labelledby="add-heading">
      <h2 id="add-heading">Add a transaction</h2>
      <form onSubmit={handleSubmit}>
        <fieldset className="segmented segmented-full">
          <legend className="visually-hidden">Type</legend>
          {types.map(([value, label]) => (
            <label key={value}>
              <input
                type="radio"
                name="type"
                value={value}
                checked={type === value}
                onChange={(e) => setType(e.target.value)}
              />
              <span>{label}</span>
            </label>
          ))}
        </fieldset>

        <label className="field">
          <span className="field-label">Description</span>
          <input
            type="text"
            placeholder="e.g. Groceries"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>

        <div className="field-row">
          <label className="field">
            <span className="field-label">Amount</span>
            <span className="amount-input">
              <span aria-hidden="true">$</span>
              <input
                type="number"
                inputMode="decimal"
                min="0.01"
                step="0.01"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </span>
          </label>
          <label className="field">
            <span className="field-label">Category</span>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories.map(cat => (
                <option key={cat} value={cat}>{formatCategory(cat)}</option>
              ))}
            </select>
          </label>
        </div>

        <button type="submit" className="button-primary">
          Add {type === "income" ? "income" : "expense"}
        </button>
      </form>
    </section>
  );
}

export default AddTransaction
