import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  layout("pages/AdminLayout.jsx", [
  route("admin/dashboard", "routes/adminDashboard.tsx"),
  route("/product", "routes/product.tsx"),
  route("/team", "routes/team.tsx"),
  ]),
] satisfies RouteConfig;
