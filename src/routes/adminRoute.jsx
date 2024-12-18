import AdminLogin from '../components/admin/adminLogin';
import { AdminLayout } from '../components/admin/adminLayout';
import { Routes, Route } from 'react-router-dom';

function AdminRoute() {
  return (
    <>
    <Routes>
      <Route path="/layout" element={<AdminLayout />} />
      <Route path="/admin" element={<AdminLogin />} />
    </Routes>
    </>
  );
}

export default AdminRoute;
