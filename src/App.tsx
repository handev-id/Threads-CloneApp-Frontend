import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./components/Layout";
import PrivateRoutes from "./components/PrivateRoute";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import useDocumentTitle from "./components/useDocumentTItle";
import Following from "./pages/Following";
function App() {
  const location =
    useLocation().pathname.slice(1).substring(0, 1).toUpperCase() +
    useLocation().pathname.slice(2) +
    " -";
  useDocumentTitle(`${location} Threads`);
  return (
    <Layout>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password/:identifier' element={<ResetPassword />} />
        <Route element={<PrivateRoutes children={<Home />} />}>
          <Route path='/' element={<Home />} />
          <Route path='/following' element={<Following />} />
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;
