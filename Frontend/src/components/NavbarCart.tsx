import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks/cart";
import { ShoppingCart } from "lucide-react";

export function NavbarCart() {
  const cartItems = useAppSelector((state) => state.cart.items);

  const totalItems = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (
    <Link to="/cart" className="relative">
      <ShoppingCart className="w-6 h-6 text-black" />

      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-[#dc3973] text-white text-xs font-bold px-2 py-[2px] rounded-full">
          {totalItems}
        </span>
      )}
    </Link>
  );
}