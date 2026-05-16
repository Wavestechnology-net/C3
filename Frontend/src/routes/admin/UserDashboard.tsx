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

  const orders = data?.data || [];

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
            <h1 className="text-4xl md:text-6xl font-extrabold uppercase leading-tight mb-5">
              MY ACCOUNT
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
        <div className="bg-gradient-to-r from-[#d6226a] via-pink-600 to-[#b01755] rounded-[32px] p-8 md:p-10 shadow-2xl mb-14 text-white overflow-hidden relative">

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
        </div>

        {/* TITLE */}
        <div className="mb-10">
          <h2 className="text-4xl md:text-5xl font-extrabold uppercase mb-4 leading-tight">
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
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {orders.map((order: any) => (
            <div
              key={order.orderId}
              className="bg-white border border-gray-200 rounded-[32px] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
            >

              {/* TOP */}
              <div className="bg-gradient-to-r from-black via-gray-900 to-black p-7 text-white">

                <div className="flex items-start justify-between gap-4 flex-wrap">

                  <div>
                    <p className="text-gray-400 text-sm uppercase tracking-[2px] mb-2">
                      Order ID
                    </p>

                    <h3 className="text-4xl font-extrabold">
                      #{order.orderId}
                    </h3>
                  </div>

                  <span
                    className={`px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wide ${order.status === "Paid"
                      ? "bg-green-500 text-white"
                      : order.status === "Pending"
                        ? "bg-yellow-400 text-black"
                        : "bg-red-500 text-white"
                      }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>

              {/* BODY */}
              <div className="p-8 space-y-8">

                {/* AMOUNT */}
                <div className="flex items-center gap-5">

                  <div className="w-16 h-16 rounded-2xl bg-pink-100 flex items-center justify-center shrink-0">
                    <CircleDollarSign
                      className="text-[#d6226a]"
                      size={28}
                    />
                  </div>

                  <div>
                    <p className="text-sm uppercase tracking-wide text-gray-500 mb-1">
                      Total Amount
                    </p>

                    <h4 className="text-3xl font-extrabold text-gray-900">
                      ${order.totalAmount}
                    </h4>
                  </div>
                </div>

                {/* PAYMENT */}
                <div className="flex items-center gap-5">

                  <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center shrink-0">
                    <CreditCard
                      className="text-blue-600"
                      size={28}
                    />
                  </div>

                  <div className="overflow-hidden">
                    <p className="text-sm uppercase tracking-wide text-gray-500 mb-1">
                      Payment Intent
                    </p>

                    <h4 className="font-semibold text-gray-800 break-all leading-7">
                      {order.stripePaymentIntentId ||
                        "Awaiting Payment Confirmation"}
                    </h4>
                  </div>
                </div>

                {/* DATE */}
                <div className="flex items-center gap-5">

                  <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center shrink-0">
                    <Calendar
                      className="text-green-600"
                      size={28}
                    />
                  </div>

                  <div>
                    <p className="text-sm uppercase tracking-wide text-gray-500 mb-1">
                      Order Date
                    </p>

                    <h4 className="font-semibold text-gray-900 text-lg">
                      {new Date(
                        order.createdAt
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          ))}
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