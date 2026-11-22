"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { title: "Home", href: "/" },
  { title: "Shop", href: "/shop" },
  { title: "Three Piece", href: "/collections/three-piece" },
  { title: "Two Piece", href: "/collections/two-piece" },
  { title: "About Us", href: "/about-us" },
  { title: "Contact Us", href: "/contact-us" },
];

interface NavMenuProps {
  className?: string;
  onItemClick?: () => void;
}

const NavMenu = ({ className, onItemClick }: NavMenuProps) => {
  const pathname = usePathname();

  return (
    <nav className={cn("flex items-center gap-6", className)}>
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onItemClick}
            className={cn(
              "text-xs xl:text-sm font-semibold uppercase tracking-wider transition-colors duration-200",
              "text-content hover:text-primary",
              isActive ? "text-primary border-b-2 border-primary pb-0.5" : "text-content"
            )}
          >
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
};

export default NavMenu;
