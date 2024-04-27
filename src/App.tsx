import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./components/Layout";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import useDocumentTitle from "./components/useDocumentTItle";
import Following from "./pages/Following";
import ProtectedRoute from "./components/ProtectedRoute";
import Post from "./pages/Post";
function App() {
  const location =
    useLocation().pathname.slice(1).substring(0, 1).toUpperCase() +
    useLocation().pathname.slice(2) +
    " -";
  useDocumentTitle(`${location && "Home - "} Threads`);
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:identifier" element={<ResetPassword />} />

      <Route path="/" element={<ProtectedRoute children={<Home />} />} />
      <Route
        path="/following"
        element={<ProtectedRoute children={<Following />} />}
      />
      <Route
        path="/post/:postId"
        element={<ProtectedRoute children={<Post />} />}
      />
    </Routes>
  );
}

export default App;
