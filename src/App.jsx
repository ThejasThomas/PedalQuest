import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UserRoute from './routes/userRoute';
import AdminRoute from './routes/adminRoute';
import Signup from '../src/pages/user/signup/signup'
import './App.css';

function App() {
  return (
    <Router>  {/* Wrap everything inside Router */}
      <Routes>
      <Route path="/" element={<Signup />} /> {/* Add route for the home page */}

        <Route path="/user/*" element={<UserRoute />} />
        <Route path="/admin/*" element={<AdminRoute />} />
      </Routes>
    </Router>
  );
}

export default App;
