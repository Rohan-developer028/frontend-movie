import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("admin-token");
  const data= JSON.parse(localStorage.getItem("user"))

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (data.role !== "admin") {
    console.log(data)
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;
