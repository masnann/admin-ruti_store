// App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserPage from "./pages/users/UserPage";
import DashboardPage from "./pages/dashboard/DashboardPage";


function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <div className="flex-grow">
          <Routes>
            <Route exact path="/customer" element={<UserPage />} />
            <Route exact path="/" element={<DashboardPage />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
