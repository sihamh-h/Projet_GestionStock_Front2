import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/login", "routes/login.tsx"),
  route("/reset-password", "routes/resetPassword.tsx"),
  route("/activate", "routes/activate.tsx"),
  route("/privacy", "routes/privacy.tsx"),
  route("/legal", "routes/legal.tsx"),
  route("/terms", "routes/terms.tsx"),
  layout("pages/AdminLayout.jsx", [
  route("admin/dashboard", "routes/adminDashboard.tsx"),
  route("admin/product", "routes/product.tsx"),
  route("admin/team", "routes/team.tsx"),
  route("admin/category", "routes/category.tsx"),
  route("admin/movement", "routes/movement.tsx"),
  route("admin/supplier", "routes/supplier.tsx"),  
  route("admin/alert", "routes/alert.tsx"),  
  route("admin/sale", "routes/sale.tsx"),
  route("admin/order", "routes/order.tsx"),
  route("admin/activity-logs", "routes/activityLogs.tsx"),
  
  ]),
  
] satisfies RouteConfig;
