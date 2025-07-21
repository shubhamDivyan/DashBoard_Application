
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FinanceForm = ({ setFinanceData }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    income: "",
    incomeNote: "",
    expenses: [],
    expenseInput: "",
    expenseAmount: "",
    savingsGoal: "",
    savingsTarget: "",
    savingsSaved: "",
    budgetCategory: "",
    budgetAmount: "",
    billName: "",
    billDueDate: "",
    debtName: "",
    debtAmount: "",
    debtInterest: "",
    investmentName: "",
    investmentAmount: "",
    investmentGrowth: "",
    bankName: "",
    bankBalance: "",
    deductibleName: "",
    deductibleAmount: "",
  });

  const handleExpenseAdd = () => {
    if (formData.expenseInput && formData.expenseAmount) {
      setFormData({
        ...formData,
        expenses: [
          ...formData.expenses,
          { note: formData.expenseInput, amount: parseFloat(formData.expenseAmount) },
        ],
        expenseInput: "",
        expenseAmount: "",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFinanceData(formData);
    navigate("/dashboard");
  };

  // Debt EMI Calculation
  const calculateEMI = () => {
    const P = parseFloat(formData.debtAmount);
    const annualRate = parseFloat(formData.debtInterest);
    const N = 12;

    if (!P || !annualRate) return 0;

    const R = annualRate / 12 / 100;
    const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    return emi.toFixed(2);
  };

  // Investment future value calculation
  const calculateFutureValue = () => {
    const principal = parseFloat(formData.investmentAmount);
    const rate = parseFloat(formData.investmentGrowth);

    if (!principal || !rate) return 0;

    const futureValue = principal * (1 + rate / 100);
    return futureValue.toFixed(2);
  };

  return (
    <div className="container mx-auto max-w-3xl p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Personal Finance Form</h1>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Income */}
        <strong>Income Calculate</strong>
        <div>
          <label className="block mb-1">Income Amount</label>
          <input
            type="number"
            value={formData.income}
            onChange={(e) => setFormData({ ...formData, income: e.target.value })}
            className="w-full border rounded px-3 py-2"
          />
          <label className="block mt-2 mb-1">Income Note</label>
          <input
            type="text"
            value={formData.incomeNote}
            onChange={(e) => setFormData({ ...formData, incomeNote: e.target.value })}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Expenses */}
        <strong>Expenses Calculate</strong>

        <div>
          <label className="block mb-1">Expense Note</label>
          <input
            type="text"
            value={formData.expenseInput}
            onChange={(e) => setFormData({ ...formData, expenseInput: e.target.value })}
            className="w-full border rounded px-3 py-2"
          />
          <label className="block mt-2 mb-1">Expense Amount</label>
          <input
            type="number"
            value={formData.expenseAmount}
            onChange={(e) => setFormData({ ...formData, expenseAmount: e.target.value })}
            className="w-full border rounded px-3 py-2"
          />
          <button
            type="button"
            onClick={handleExpenseAdd}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Expense
          </button>

          <div className="mt-2">
            {formData.expenses.map((e, i) => (
              <div key={i} className="text-sm">
                {e.note}: ₹{e.amount}
              </div>
            ))}
          </div>
        </div>

        {/* Savings Goal */}
        <strong>Saving Goal</strong> <br />

        <div>
          <label className="block mb-1">Savings Goal Name</label>
          <input
            type="text"
            value={formData.savingsGoal}
            onChange={(e) => setFormData({ ...formData, savingsGoal: e.target.value })}
            className="w-full border rounded px-3 py-2"
          />

          <label className="block mt-2 mb-1">Target Amount</label>
          <input
            type="number"
            value={formData.savingsTarget}
            onChange={(e) => setFormData({ ...formData, savingsTarget: e.target.value })}
            className="w-full border rounded px-3 py-2"
          />

          <label className="block mt-2 mb-1">Amount Saved</label>
          <input
            type="number"
            value={formData.savingsSaved}
            onChange={(e) => setFormData({ ...formData, savingsSaved: e.target.value })}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Budget Planner */}
        <strong>Plan Budget</strong>

        <div>
          <label className="block mb-1">Budget Category</label>
          <input
            type="text"
            value={formData.budgetCategory}
            onChange={(e) => setFormData({ ...formData, budgetCategory: e.target.value })}
            className="w-full border rounded px-3 py-2"
          />
          <label className="block mt-2 mb-1">Budget Amount</label>
          <input
            type="number"
            value={formData.budgetAmount}
            onChange={(e) => setFormData({ ...formData, budgetAmount: e.target.value })}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Bill Reminder */}
        <strong>Bill Reminder</strong>

        <div>
          <label className="block mb-1">Bill Name</label>
          <input
            type="text"
            value={formData.billName}
            onChange={(e) => setFormData({ ...formData, billName: e.target.value })}
            className="w-full border rounded px-3 py-2"
          />
          <label className="block mt-2 mb-1">Due Date</label>
          <input
            type="date"
            value={formData.billDueDate}
            onChange={(e) => setFormData({ ...formData, billDueDate: e.target.value })}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Debt Management */}
        <strong>Debt Management</strong>

        <div>
          <label className="block mb-1">Debt Name</label>
          <input
            type="text"
            value={formData.debtName}
            onChange={(e) => setFormData({ ...formData, debtName: e.target.value })}
            className="w-full border rounded px-3 py-2"
          />
          <label className="block mt-2 mb-1">Debt Amount</label>
          <input
            type="number"
            value={formData.debtAmount}
            onChange={(e) => setFormData({ ...formData, debtAmount: e.target.value })}
            className="w-full border rounded px-3 py-2"
          />
          <label className="block mt-2 mb-1">Interest Rate %</label>
          <input
            type="number"
            value={formData.debtInterest}
            onChange={(e) => setFormData({ ...formData, debtInterest: e.target.value })}
            className="w-full border rounded px-3 py-2"
          />
          <div className="mt-2 text-green-700 font-semibold">
            Estimated Monthly EMI: ₹{calculateEMI()}
          </div>
        </div>

        {/* Investment Tracking */}
        <strong>Track Your Investment</strong>

        <div>
          <label className="block mb-1">Investment Name</label>
          <input
            type="text"
            value={formData.investmentName}
            onChange={(e) => setFormData({ ...formData, investmentName: e.target.value })}
            className="w-full border rounded px-3 py-2"
          />
          <label className="block mt-2 mb-1">Amount Invested</label>
          <input
            type="number"
            value={formData.investmentAmount}
            onChange={(e) => setFormData({ ...formData, investmentAmount: e.target.value })}
            className="w-full border rounded px-3 py-2"
          />
          <label className="block mt-2 mb-1">Growth %</label>
          <input
            type="number"
            value={formData.investmentGrowth}
            onChange={(e) => setFormData({ ...formData, investmentGrowth: e.target.value })}
            className="w-full border rounded px-3 py-2"
          />
          <div className="mt-2 text-green-700 font-semibold">
            Estimated Value Next Year: ₹{calculateFutureValue()}
          </div>
        </div>

        {/* Bank Account */}
        <strong>Bank Account</strong>

        <div>
          <label className="block mb-1">Bank Name</label>
          <input
            type="text"
            value={formData.bankName}
            onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
            className="w-full border rounded px-3 py-2"
          />
          <label className="block mt-2 mb-1">Current Balance</label>
          <input
            type="number"
            value={formData.bankBalance}
            onChange={(e) => setFormData({ ...formData, bankBalance: e.target.value })}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Tax Preparation */}
        <strong>Tax Preparation</strong>

        <div>
          <label className="block mb-1">Deductible Name</label>
          <input
            type="text"
            value={formData.deductibleName}
            onChange={(e) => setFormData({ ...formData, deductibleName: e.target.value })}
            className="w-full border rounded px-3 py-2"
          />
          <label className="block mt-2 mb-1">Deductible Amount</label>
          <input
            type="number"
            value={formData.deductibleAmount}
            onChange={(e) => setFormData({ ...formData, deductibleAmount: e.target.value })}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Submit & Go to Dashboard
        </button>
      </form>
    </div>
  );
};

export default FinanceForm;
