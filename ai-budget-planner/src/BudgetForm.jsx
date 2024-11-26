/* BudgetForm.jsx */
import React, { useState } from 'react';

export default function BudgetForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    income: '',
    needs: '',
    wants: '',
    savings: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="income" className="block text-sm font-medium text-gray-700">Monthly Income</label>
        <input
          type="number"
          id="income"
          name="income"
          value={formData.income}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm"
          placeholder="Enter your monthly income"
          required
        />
      </div>
      <div>
        <label htmlFor="needs" className="block text-sm font-medium text-gray-700">Needs</label>
        <input
          type="number"
          id="needs"
          name="needs"
          value={formData.needs}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm"
          placeholder="Enter your monthly needs"
          required
        />
      </div>
      <div>
        <label htmlFor="wants" className="block text-sm font-medium text-gray-700">Wants</label>
        <input
          type="number"
          id="wants"
          name="wants"
          value={formData.wants}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm"
          placeholder="Enter your monthly wants"
          required
        />
      </div>
      <div>
        <label htmlFor="savings" className="block text-sm font-medium text-gray-700">Savings</label>
        <input
          type="number"
          id="savings"
          name="savings"
          value={formData.savings}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm"
          placeholder="Enter your monthly savings"
          required
        />
      </div>
      <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700">
        Calculate Budget
      </button>
    </form>
  );
}
