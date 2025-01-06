import AdminLogin from '../pages/admin/login/adminLogin';
import { AdminLayout } from '../pages/admin/layout/AdminLayout';
import { Routes, Route } from 'react-router-dom';
import { DashboardPage } from '../pages/admin/Dashboard/Dashboard';
import { ProductPage } from '../pages/admin/ProductPage/ProductsPage';
import CategoryPage from '../pages/admin/CategoryPage/CategoryPage';
import Banner from '../pages/admin/Banner/banner';
import Order from '../pages/admin/Orders/orders';
import Coupon from '../pages/admin/Coupon/coupon';
import Transaction from '../pages/admin/Transactions/transaction';
import Customers from '../pages/admin/Customers/customers';
import Settings from '../pages/admin/Settings/settings';
import LogOut from '../pages/admin/Logout/logout';
import AddProductPage from '../components/admin/Products/AddProducts';
import AddCategory from '../components/admin/AddCategory/AddCategory';
import EditProductPage from '../components/admin/Products/EditProducts';
import EditCategory from '../components/admin/AddCategory/EditCategory';

function AdminRoute() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLogin />} />
      
      <Route element={<AdminLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/banner" element={<Banner />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/coupon" element={<Coupon />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/customer" element={<Customers />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/logout" element={<LogOut />} />
        <Route path="/addcategory" element={<AddCategory />} />
        <Route path="/addproducts" element={<AddProductPage />} />
        <Route path="/editproducts/:productId" element={<EditProductPage />} />
        <Route path="/editcategory/:categoryId" element={<EditCategory />} />
      </Route>
    </Routes>
  );
}

export default AdminRoute;