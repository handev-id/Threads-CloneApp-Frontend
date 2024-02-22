import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register";
import Layout from "./components/Layout";
function App() {
  const isToken = localStorage.getItem('token');

  return (
    <Layout>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Layout>
  )
}

export default App;