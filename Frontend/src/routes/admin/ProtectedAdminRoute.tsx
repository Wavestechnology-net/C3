import { Outlet } from "react-router-dom";
import ProtectedRoute from "../../components/ProtectedRoute";
import Layout from "./Layout";

export default function ProtectedAdminRoute() {
  return (
    <ProtectedRoute roles={["Admin"]}>
      <Layout>
        <Outlet />
      </Layout>
    </ProtectedRoute>
  );
};