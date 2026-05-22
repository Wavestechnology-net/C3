
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../../services/apis/productApi";
import { useGetOrdersQuery } from "../../services/apis/orderApi";
import { useGetPagesQuery } from "../../services/apis/pageApi";
import { CircleDollarSign, Clock3, FileText, Package, ShoppingCart } from "lucide-react";

const DashboardCard = ({
  title,
  value,
  icon: Icon,
  link,
  color,
}: any) => {
  return (
    <Link
      to={link}
      className="group relative overflow-hidden rounded-2xl bg-white border border-gray-200 p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      {/* ICON */}
      <div
        className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${color}`}
      >
        <Icon className="w-7 h-7 text-white" />
      </div>

      {/* CONTENT */}
      <div>
        <p className="text-sm text-gray-500 mb-1">
          {title}
        </p>

        <h2 className="text-3xl font-bold text-gray-900">
          {value}
        </h2>
      </div>

      {/* HOVER EFFECT */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-yellow-300 rounded-2xl pointer-events-none transition-all duration-300" />
    </Link>
  );
};

export default function ContentDashboard() {

  // PRODUCTS
  const { data: products = [] } = useGetProductsQuery();

  // ORDERS
  const { data: orders = [] } = useGetOrdersQuery();

  // PAGES
  const { data: pages = [] } = useGetPagesQuery();

  // MEDIA
  // const { data: mediaResponse } = useGetAllMediaQuery();

  // const media = mediaResponse?.data || [];

  // ORDER STATS
  const paidOrders = orders.filter(
    (o: any) => o.status === "Paid"
  );

  const pendingOrders = orders.filter(
    (o: any) => o.status === "Pending"
  );

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Dashboard Overview
        </h1>

        <p className="text-gray-500 mt-1">
          Manage your CMS, products, media and orders.
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

        <DashboardCard
          title="Total Products"
          value={products.length}
          icon={Package}
          link="/admin/products"
          color="bg-blue-500"
        />

        <DashboardCard
          title="Total Orders"
          value={orders.length}
          icon={ShoppingCart}
          link="/admin/orders"
          color="bg-purple-500"
        />

        <DashboardCard
          title="Paid Orders"
          value={paidOrders.length}
          icon={CircleDollarSign}
          link="/admin/orders"
          color="bg-green-500"
        />

        <DashboardCard
          title="Pending Orders"
          value={pendingOrders.length}
          icon={Clock3}
          link="/admin/orders"
          color="bg-yellow-500"
        />

        <DashboardCard
          title="Pages"
          value={pages.length}
          icon={FileText}
          link="/admin/pages"
          color="bg-pink-500"
        />

      </div>
    </div>
  );
}