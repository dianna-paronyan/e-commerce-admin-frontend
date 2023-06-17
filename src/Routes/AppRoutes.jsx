import { Route, Routes } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Layout from "../Layouts/Layout";
import Home from "../pages/Home";
import Admin from "../pages/adminPage/Admin";
import Products from "../components/Products";
import CreateProduct from "../components/CreateProduct";
import EditProduct from "../components/EditProduct";
import Categories from "../components/Categories";
import CreateCategory from "../components/CreateCategory";
import ProtectedRoute from "./ProtectedRoute";
import EditCategory from "../components/EditCategory";
import NotFound from "../components/NotFound";

function AppRoutes() {
  const {user} = useLocalStorage();

  return (
    <Routes>
      <Route path="/" element={user && user.role === 1 ? <Admin /> : <Login/>} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route element={<Layout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
        <Route path="/createProduct" element={<ProtectedRoute><CreateProduct /></ProtectedRoute>} />
        <Route path="/updateProduct/:id" element={<ProtectedRoute><EditProduct /></ProtectedRoute>} />
        <Route path="/categories" element={<ProtectedRoute><Categories /></ProtectedRoute>} />
        <Route path="/createCategory" element={<ProtectedRoute><CreateCategory /></ProtectedRoute>} />
        <Route path="/updateCategory/:id" element={<ProtectedRoute><EditCategory /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
