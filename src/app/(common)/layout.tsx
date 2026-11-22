import Footer from "@/components/shared/Footer/Footer";
import Navbar from "@/components/shared/Navbar/Navbar";
import CartSidebar from "@/components/shared/Cart/CartSidebar";
import GlobalPreloader from "@/components/shared/Loader/GlobalPreloader";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";

export default function CommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <WishlistProvider>
      <CartProvider>
        <GlobalPreloader />
        <div className="min-h-screen flex flex-col bg-background text-content">
          <header className="sticky top-0 z-50 w-full">
            <Navbar />
          </header>
          <main className="flex-1 w-full">{children}</main>
          <Footer />
          <CartSidebar />
        </div>
      </CartProvider>
    </WishlistProvider>
  );
}
