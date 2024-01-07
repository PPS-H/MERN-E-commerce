import { Suspense, lazy } from "react";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loding from "./components/admin/Loding";
import AdminPanel from "./components/admin/Sidebar/AdminPanel";
import NewProduct from "./pages/admin/management/NewProduct";

const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const Transactions = lazy(() => import("./pages/admin/Transactions"));
const Customers = lazy(() => import("./pages/admin/Customers"));
const Products = lazy(() => import("./pages/admin/Products"));

function App() {
  return (
    <BrowserRouter>
      <div className="bg-stone-100 grid grid-cols-5 h-[100vh]">
        <AdminPanel />
        <Suspense fallback={<Loding />}>
          <Routes>
            <Route path="/admin/dashboard" element={<Dashboard />}></Route>
            <Route path="/admin/products" element={<Products />}></Route>
            <Route path="/admin/customers" element={<Customers />}></Route>
            <Route
              path="/admin/transactions"
              element={<Transactions />}
            ></Route>
            <Route
              path="/admin/transactions"
              element={<Transactions />}
            ></Route>
            <Route path="/admin/product/new" element={<NewProduct />}></Route>
            <Route path="/admin/product/:id" element={<Customers />}></Route>
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
