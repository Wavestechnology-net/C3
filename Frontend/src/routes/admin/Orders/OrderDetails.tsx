import { useParams } from "react-router-dom";
import OrderStatusBadge from "./OrderStatusBadge";
import { useGetOrderByIdQuery } from "../../../services/apis/orderApi";

export default function OrderDetails() {
    const { id } = useParams();

    const { data: order, isLoading } =
        useGetOrderByIdQuery(Number(id));

    if (isLoading)
        return <p className="p-6">Loading order...</p>;

    if (!order)
        return <p className="p-6">Order not found</p>;

    return (
        <div className="space-y-6">
            {/* HEADER */}
            <div className="bg-white rounded-2xl border p-6 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">
                        Order #{order.orderId}
                    </h1>

                    <p className="text-gray-500 mt-1">
                        <span className="font-medium">
                            Order Created At:
                        </span>{" "}
                        {new Date(
                            order.createdAt
                        ).toLocaleString()}
                    </p>
                </div>

                <OrderStatusBadge status={order.status} />
            </div>

            {/* CUSTOMER */}
            <div className="bg-white rounded-2xl border p-6">
                <h2 className="text-lg font-semibold mb-4">
                    Customer
                </h2>

                <div className="space-y-2 text-sm">
                    <p>
                        <span className="font-medium">
                            Username:
                        </span>{" "}
                        {order.username}
                    </p>
                    <p>
                        <span className="font-medium">
                            Email Id:
                        </span>{" "}
                        {order.userEmail}
                    </p>

                    <p>
                        <span className="font-medium">
                            Total Items:
                        </span>{" "}
                        {order.totalItems}
                    </p>
                </div>
            </div>

            {/* PRODUCTS */}
            <div className="bg-white rounded-2xl border overflow-hidden">
                <div className="px-6 py-4 border-b">
                    <h2 className="text-lg font-semibold">
                        Order Items
                    </h2>
                </div>

                <div className="divide-y">
                    {order.items?.map((item: any) => (
                        <div
                            key={item.orderItemId}
                            className="p-6 flex items-center justify-between"
                        >
                            <div className="flex items-center gap-4">
                                <img
                                    src={
                                        import.meta.env.VITE_BASE_API_URL +
                                        item.imageUrl
                                    }
                                    alt={item.productName}
                                    className="w-20 h-20 rounded-xl object-cover border"
                                />

                                <div>
                                    <h3 className="font-semibold">
                                        {item.productName}
                                    </h3>

                                    <p className="text-sm text-gray-500 mt-1">
                                        Size: {item.size}
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        Qty: {item.quantity}
                                    </p>
                                </div>
                            </div>

                            <div className="font-semibold text-lg">
                                ${item.total}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* SUMMARY */}
            <div className="bg-white rounded-2xl border p-6">
                <div className="flex items-center justify-between text-lg font-semibold">
                    <span>Total Amount</span>

                    <span>${order.totalAmount}</span>
                </div>
            </div>
        </div>
    );
}