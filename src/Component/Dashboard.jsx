import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const Dashboard = ({ financeData }) => {
  const income = parseFloat(financeData.income) || 0;
  const totalExpenses = financeData.expenses.reduce(
    (sum, e) => sum + e.amount,
    0
  );

  const incomeExpenseData = [
    { name: "Income", value: income },
    { name: "Expenses", value: totalExpenses },
  ];

  const COLORS = ["#34d399", "#f87171"];

  const expensesBarData = financeData.expenses.map((e) => ({
    name: e.note,
    amount: e.amount,
  }));

  const handleDownload = () => {
    const fileData = JSON.stringify(financeData, null, 2);
    const blob = new Blob([fileData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "dashboard-data.json";
    link.href = url;
    link.click();
  };

  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-300 min-h-screen py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">📊 Financial Dashboard</h1>
          <button
            onClick={handleDownload}
            className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700"
          >
            Download Data
          </button>
        </div>

        {/* Income vs Expenses */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Income vs Expenses</h2>
          <div className="flex justify-center">
            <PieChart width={400} height={400}>
              <Pie
                data={incomeExpenseData}
                dataKey="value"
                outerRadius={130}
                label
              >
                {incomeExpenseData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </div>
        </div>

        {/* Expenses Bar Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Expenses Breakdown</h2>
          <BarChart width={600} height={300} data={expensesBarData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="amount" fill="#60a5fa" />
          </BarChart>
        </div>

        {/* Savings Goal */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Savings Goal Progress</h2>
          <p className="mb-2">
            <strong>{financeData.savingsGoal}</strong>: ₹{financeData.savingsSaved} / ₹{financeData.savingsTarget}
          </p>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-green-500 h-4 rounded-full"
              style={{
                width: `${
                  financeData.savingsTarget
                    ? (financeData.savingsSaved / financeData.savingsTarget) * 100
                    : 0
                }%`,
              }}
            ></div>
          </div>
        </div>

        {/* Budget Planner */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Budget Planner</h2>
          <p>
            <strong>Category:</strong> {financeData.budgetCategory} <br />
            <strong>Budget:</strong> ₹{financeData.budgetAmount}
          </p>
        </div>

        {/* Other financial summaries in professional card layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bill Reminder */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-2 text-gray-700">Upcoming Bill</h2>
            <p>{financeData.billName} due on {financeData.billDueDate}</p>
          </div>

          {/* Debt Management */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-2 text-gray-700">Debt Summary</h2>
            <p>{financeData.debtName}: ₹{financeData.debtAmount} at {financeData.debtInterest}% interest</p>
          </div>

          {/* Investment Tracking */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-2 text-gray-700">Investments</h2>
            <p>{financeData.investmentName}: ₹{financeData.investmentAmount} (Growth: {financeData.investmentGrowth}%)</p>
          </div>

          {/* Bank Account */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-2 text-gray-700">Bank Account</h2>
            <p>{financeData.bankName}: ₹{financeData.bankBalance}</p>
          </div>

          {/* Tax Preparation */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-2 text-gray-700">Tax Deductibles</h2>
            <p>{financeData.deductibleName}: ₹{financeData.deductibleAmount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
