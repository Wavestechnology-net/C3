type Props = {
    status: string;
};

export default function OrderStatusBadge({ status }: Props) {
    const styles =
        status === "Paid"
            ? "bg-green-100 text-green-700"
            : "bg-yellow-100 text-yellow-700";

    return (
        <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${styles}`}
        >
            {status}
        </span>
    );
}