import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  layout("pages/AdminLayout.jsx", [
  route("admin/dashboard", "routes/adminDashboard.tsx"),
  route("/product", "routes/product.tsx"),
  route("/team", "routes/team.tsx"),
  route("/category", "routes/category.tsx"),
  route("/movement", "routes/movement.tsx"),
  route("/supplier", "routes/supplier.tsx"),  
  route("/alert", "routes/alert.tsx"),  
  
  ]),
] satisfies RouteConfig;
