import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import PrivateRoute from "@/components/PrivateRoute";
import Orders from "@/pages/Orders";
import Inventory from "@/pages/Inventory";

function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {!isAuthPage && <Navbar />}
      <Routes>
        <Route element={<PrivateRoute allowedRoles={["user"]} />}>
          <Route path="/" element={<Home />} />
          <Route path="/orders" element={<Orders />} />
          <Route
            path="/cart"
            element={
              <div className="p-8 text-center text-xl font-bold">Cart Page (Coming Soon)</div>
            }
          />
        </Route>

        <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
          <Route
            path="/dashboard"
            element={
              <div className="p-8 text-center text-xl font-bold">
                Admin Dashboard (Statistics etc.)
              </div>
            }
          />
          <Route path="/inventory" element={<Inventory />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

export default App;
