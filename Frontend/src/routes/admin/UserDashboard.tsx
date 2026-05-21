import { useSelector } from "react-redux";
import { loggedUser } from "../../services/authSlice";
import { useGetMyOrdersQuery } from "../../services/apis/orderApi";
import Header from "../../components/Header";
import { Calendar, CircleDollarSign, CreditCard, Package, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

export default function UserDashboard() {
  const user = useSelector(loggedUser);

  const {
    data,
    isLoading,
    isError,
  } = useGetMyOrdersQuery();

  const orders = data || [];

  return (
    <div className="bg-white min-h-screen overflow-hidden">
      <Header />

      {/* HERO */}
      <div className="relative h-[420px] w-full overflow-hidden">
        <img
          src="/img6.jpg"
          alt="Dashboard"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/55" />

        <div className="absolute inset-0 flex items-center px-6 md:px-24">
          <div className="text-white mt-20 max-w-3xl">
            <h1 className="text-2xl md:text-4xl font-extrabold uppercase leading-tight mb-5">
              Welcome Back, {user?.username}
            </h1>

            <p className="text-lg md:text-2xl text-gray-200 leading-relaxed">
              Track your purchases, payment statuses, and order
              history securely.
            </p>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="px-4 md:px-24 py-14 bg-white">

        {/* USER CARD */}
        {/* <div className="bg-gradient-to-r from-[#d6226a] via-pink-600 to-[#b01755] rounded-[32px] p-8 md:p-10 shadow-2xl mb-14 text-white overflow-hidden relative">

          <div className="absolute right-[-40px] top-[-40px] w-56 h-56 bg-white/10 rounded-full"></div>
          <div className="absolute bottom-[-60px] left-[-40px] w-72 h-72 bg-white/5 rounded-full"></div>

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">

            <div>
              <p className="uppercase tracking-[3px] text-pink-100 text-sm mb-3">
                Welcome Back
              </p>

              <h2 className="text-4xl font-bold mb-3 uppercase">
                {user?.username}
              </h2>

              <p className="text-pink-100 text-lg break-all">
                {user?.email}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 min-w-[170px]">
                <p className="text-sm text-pink-100 mb-2 uppercase tracking-wide">
                  Total Orders
                </p>

                <h3 className="text-5xl font-extrabold">
                  {orders.length}
                </h3>
              </div>

              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 min-w-[170px]">
                <p className="text-sm text-pink-100 mb-2 uppercase tracking-wide">
                  Account Role
                </p>

                <h3 className="text-3xl font-bold uppercase">
                  {user?.role}
                </h3>
              </div>
            </div>
          </div>
        </div> */}
        <div className="bg-gradient-to-r from-[#d6226a] to-pink-600 rounded-2xl p-6 shadow-md mb-10 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            {/* USER INFO */}
            <div>
              <p className="uppercase tracking-widest text-xs text-pink-100 mb-2">
                Welcome Back
              </p>

              <h2 className="text-2xl font-bold uppercase">
                {user?.username}
              </h2>

              <p className="text-pink-100 text-sm mt-1">
                {user?.email}
              </p>
            </div>

            {/* STATS */}
            <div className="flex gap-4">

              <div className="bg-white/15 rounded-xl px-4 py-3 min-w-[120px] text-center">
                <p className="text-xs text-pink-100">Orders</p>
                <p className="text-2xl font-bold">{orders.length}</p>
              </div>

              <div className="bg-white/15 rounded-xl px-4 py-3 min-w-[120px] text-center">
                <p className="text-xs text-pink-100">Role</p>
                <p className="text-lg font-semibold uppercase">
                  {user?.role}
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* TITLE */}
        <div className="mb-10">
          <h2 className="text-4xl md:text-4xl font-extrabold uppercase mb-4 leading-tight">
            ORDER HISTORY
          </h2>

          <p className="text-gray-600 text-lg max-w-3xl leading-8">
            View your complete order activity including payment
            confirmations and purchase history.
          </p>
        </div>

        {/* LOADING */}
        {isLoading && (
          <div className="bg-white border border-gray-200 rounded-3xl shadow-xl p-16 text-center">
            <div className="animate-spin rounded-full h-14 w-14 border-b-2 border-[#d6226a] mx-auto mb-6"></div>

            <h3 className="text-2xl font-bold mb-2">
              Loading Orders
            </h3>

            <p className="text-gray-600 text-lg">
              Please wait while we fetch your purchases.
            </p>
          </div>
        )}

        {/* ERROR */}
        {isError && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-6 shadow-md">
            Failed to load your orders.
          </div>
        )}

        {/* EMPTY */}
        {!isLoading && orders.length === 0 && (
          <div className="bg-white border border-gray-200 rounded-[32px] shadow-2xl p-12 md:p-16 text-center">

            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-8">
              <ShoppingBag
                size={42}
                className="text-gray-500"
              />
            </div>

            <h3 className="text-4xl font-bold mb-5 uppercase">
              No Orders Found
            </h3>

            <p className="text-gray-600 text-lg leading-8 max-w-2xl mx-auto mb-10">
              You have not placed any orders yet. Start shopping
              and your purchases will appear here.
            </p>

            <Link
              to="/shop"
              className="inline-flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-10 py-5 rounded-2xl transition-all duration-300"
            >
              Visit Shop
            </Link>
          </div>
        )}

        {/* ORDERS */}
        <div className="overflow-x-auto bg-white border rounded-2xl shadow-sm">

          <table className="w-full text-sm text-left">

            {/* HEADER */}
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-4 py-3">Order</th>
                <th className="px-4 py-3">Products</th>
                {/* <th className="px-4 py-3">User</th> */}
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody>
              {orders.map((order: any) => (
                <tr
                  key={order.orderId}
                  className="border-b hover:bg-gray-50 align-top"
                >

                  {/* ORDER ID */}
                  <td className="px-4 py-4 font-semibold">
                    #{order.orderId}
                  </td>

                  {/* PRODUCTS */}
                  <td className="px-4 py-4">
                    <div className="space-y-2">

                      {order.items?.map((item: any, index: number) => (
                        <div
                          key={index}
                          className="flex items-center gap-3"
                        >

                          <img
                            src={
                              item.imageUrl
                                ? import.meta.env.VITE_BASE_API_URL + item.imageUrl
                                : "/placeholder.png"
                            }
                            className="w-15 h-15 rounded-md object-cover border"
                          />

                          <div className="leading-tight">
                            <p className="font-medium text-gray-800">
                              {item.productName}
                            </p>
                            <p className="text-xs text-gray-500">
                              Qty: {item.quantity} | Size: {item.size}
                            </p>
                          </div>

                        </div>
                      ))}

                    </div>
                  </td>

                  {/* USER */}
                  {/* <td className="px-4 py-4">
                    <p className="font-medium text-gray-800">
                      {order.username || order.userEmail}
                    </p>
                  </td> */}

                  {/* TOTAL */}
                  <td className="px-4 py-4 font-bold text-gray-900">
                    ${order.totalAmount}
                  </td>

                  {/* DATE */}
                  <td className="px-4 py-4 text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>

                  {/* STATUS */}
                  <td className="px-4 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${order.status === "Paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                        }`}
                    >
                      {order.status}
                    </span>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

      {/* FOOTER */}
      <div className="bg-gray-100 py-16 px-6 mt-10">
        <div className="max-w-4xl mx-auto text-center">

          <Package
            size={52}
            className="mx-auto text-[#d6226a] mb-6"
          />

          <h2 className="text-3xl md:text-4xl font-bold uppercase mb-5">
            Need Help With Your Orders?
          </h2>

          <p className="text-gray-600 text-lg leading-8">
            Our support team is available to help with order
            tracking, payment issues, and product support.
          </p>
        </div>
      </div>
    </div>
  );
}