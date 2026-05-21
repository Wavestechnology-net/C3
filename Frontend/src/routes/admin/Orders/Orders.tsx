import { useMemo, useState } from "react";
import { useGetOrdersQuery } from "../../../services/apis/orderApi";
import { Eye, Search } from "lucide-react";
import OrderStatusBadge from "./OrderStatusBadge";
import { Link } from "react-router-dom";

export default function Orders() {
    const { data: orders = [], isLoading } = useGetOrdersQuery();

    const [search, setSearch] = useState("");

    const [currentPage, setCurrentPage] = useState(1);

    const ITEMS_PER_PAGE = 10;

    const filteredOrders = useMemo(() => {
        return orders.filter((order) => {
            const q = search.toLowerCase();

            return (
                order.userEmail?.toLowerCase().includes(q) ||
                order.orderId.toString().includes(q)
            );
        });
    }, [orders, search]);

    const totalPages = Math.ceil(
        filteredOrders.length / ITEMS_PER_PAGE
    );

    const paginatedOrders = filteredOrders.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    if (isLoading)
        return <p className="p-6">Loading orders...</p>;

    return (
        <div className="space-y-6">
            {/* HEADER */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">
                        Orders Management
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Track all customer orders
                    </p>
                </div>
            </div>

            {/* SEARCH */}
            <div className="bg-white border rounded-2xl p-4">
                <div className="relative max-w-md">
                    <Search
                        size={18}
                        className="absolute left-3 top-3 text-gray-400"
                    />

                    <input
                        type="text"
                        placeholder="Search by email or order id..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="w-full border rounded-xl pl-10 pr-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* TABLE */}
            <div className="bg-white rounded-2xl border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="text-left px-6 py-4 font-semibold">
                                    S.No
                                </th>

                                <th className="text-left px-6 py-4 font-semibold">
                                    Order No
                                </th>

                                <th className="text-left px-6 py-4 font-semibold">
                                    Customer
                                </th>

                                <th className="text-left px-6 py-4 font-semibold">
                                    Items
                                </th>

                                <th className="text-left px-6 py-4 font-semibold">
                                    Quantity
                                </th>

                                <th className="text-left px-6 py-4 font-semibold">
                                    Amount
                                </th>

                                <th className="text-left px-6 py-4 font-semibold">
                                    Status
                                </th>

                                <th className="text-left px-6 py-4 font-semibold">
                                    Date
                                </th>

                                <th className="text-right px-6 py-4 font-semibold">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {paginatedOrders.map((order, index) => (
                                <tr
                                    key={order.orderId}
                                    className="border-b last:border-none hover:bg-gray-50"
                                >
                                    {/* S. NO */}
                                    <td className="px-6 py-4 font-semibold">
                                        {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                                    </td>

                                    {/* ORDER ID */}
                                    <td className="px-6 py-4 font-semibold">
                                        #{order.orderId}
                                    </td>

                                    {/* CUSTOMER */}
                                    <td className="px-6 py-4">
                                        {order.username} ({order.userEmail})
                                    </td>

                                    {/* ITEMS */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            {/* PREVIEW IMAGES */}
                                            <div className="flex -space-x-2">
                                                {order.items
                                                    ?.slice(0, 3)
                                                    .map((item: any) => (
                                                        <img
                                                            key={item.orderItemId}
                                                            src={
                                                                import.meta.env.VITE_BASE_API_URL +
                                                                item.imageUrl
                                                            }
                                                            alt={item.productName}
                                                            className="w-8 h-8 rounded-full border object-cover"
                                                        />
                                                    ))}
                                            </div>

                                            {/* <span className="text-gray-600">
                                                {order.totalItems} items
                                            </span> */}
                                        </div>
                                    </td>

                                    {/* QTY */}
                                    <td className="px-6 py-4 font-semibold">
                                        {order.totalItems}
                                    </td>

                                    {/* AMOUNT */}
                                    <td className="px-6 py-4 font-semibold">
                                        ${order.totalAmount}
                                    </td>

                                    {/* STATUS */}
                                    <td className="px-6 py-4">
                                        <OrderStatusBadge
                                            status={order.status}
                                        />
                                    </td>

                                    {/* DATE */}
                                    <td className="px-6 py-4 text-gray-500">
                                        {new Date(
                                            order.createdAt
                                        ).toLocaleDateString()}
                                    </td>

                                    {/* ACTIONS */}
                                    <td className="px-6 py-4">
                                        <div className="flex justify-end">
                                            <Link
                                                to={`/admin/orders/${order.orderId}`}
                                                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border hover:bg-gray-50"
                                            >
                                                <Eye size={16} />
                                                View
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {paginatedOrders.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={7}
                                        className="text-center py-10 text-gray-500"
                                    >
                                        No orders found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* PAGINATION */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between px-6 py-4 border-t">
                        <button
                            disabled={currentPage === 1}
                            onClick={() =>
                                setCurrentPage((p) => p - 1)
                            }
                            className="px-4 py-2 border rounded-lg disabled:opacity-50"
                        >
                            Previous
                        </button>

                        <div className="text-sm text-gray-500">
                            Page {currentPage} of {totalPages}
                        </div>

                        <button
                            disabled={currentPage === totalPages}
                            onClick={() =>
                                setCurrentPage((p) => p + 1)
                            }
                            className="px-4 py-2 border rounded-lg disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}