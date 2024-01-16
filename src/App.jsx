// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserPage from "./pages/users/UserPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import Login from "./pages/login/LoginPage";
import ProductPage from "./pages/product/ProductPage";
import OrderPage from "./pages/order/OrderPage";
import PaymentPage from "./pages/payment/PaymentPage";
import BlogPostPage from "./pages/blogpost/BlogpostPage";
import AddProductPage from "./pages/product/AddProduct";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
        <Router>
            <div className="flex-grow">
              <Routes>
                <Route path="/customer" element={<UserPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<DashboardPage />} />
                <Route path="/products" element={<ProductPage />} />
                <Route path="/products/create" element={<AddProductPage />} />
                <Route path="/orders" element={<OrderPage />} />
                <Route path="/payments" element={<PaymentPage />} />
                <Route path="/blog-posts" element={<BlogPostPage />} />
              </Routes>
          </div>
        </Router>
    </div>
  );
}

export default App;
