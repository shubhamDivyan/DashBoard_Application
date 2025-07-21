import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FinanceForm from "./Component/FinanceForm";
import Dashboard from "./Component/Dashboard";

function App() {
  const [financeData, setFinanceData] = useState({});

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<FinanceForm setFinanceData={setFinanceData} />}
        />
        <Route
          path="/dashboard"
          element={<Dashboard financeData={financeData} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
