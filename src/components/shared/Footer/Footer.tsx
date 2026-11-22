"use client";

import Link from "next/link";
import {
  InstagramOutlined,
  MailOutlined,
  PhoneFilled,
} from "@ant-design/icons";
import {
  FaFacebook,
  FaLocationDot,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

const footerLinks = [
  { title: "About Us", link: "/about-us" },
  { title: "Shop All", link: "/shop" },
  { title: "Three Piece Collection", link: "/collections/three-piece" },
  { title: "Two Piece Collection", link: "/collections/two-piece" },
  { title: "Size Guide", link: "/size-guide" },
  { title: "Terms & Conditions", link: "/terms" },
  { title: "Privacy Policy", link: "/privacy" },
  { title: "FAQ", link: "/faq" },
  { title: "Contact Us", link: "/contact-us" },
];

const Footer = () => {
  return (
    <footer className="w-full">
      {/* Top Footer */}
      <div className="bg-primary text-primary-fg py-16">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Col 1: Brand Info */}
            <div className="flex flex-col gap-4">
              <span className="text-3xl font-black tracking-widest uppercase">
                Zanass
              </span>
              <p className="text-primary-fg/80 text-sm leading-relaxed">
                Zanass Clothing — Bangladesh&apos;s leading online destination for premium women&apos;s ethnic wear, three-piece sets, and elegant designer clothing.
              </p>
              <div className="flex flex-col gap-3 mt-2 text-sm text-primary-fg/90">
                <div className="flex items-start gap-3">
                  <div className="bg-background text-primary p-2 rounded-full shrink-0">
                    <FaLocationDot size={14} />
                  </div>
                  <span className="mt-1">Dhaka, Bangladesh</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-background text-primary p-2 rounded-full shrink-0">
                    <PhoneFilled size={14} />
                  </div>
                  <span className="mt-1">+880 1700-000000</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-background text-primary p-2 rounded-full shrink-0">
                    <MailOutlined size={14} />
                  </div>
                  <span className="mt-1">support@zanass.com</span>
                </div>
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div>
              <h4 className="text-base font-bold uppercase tracking-wider mb-4 border-b border-primary-fg/20 pb-2">
                Quick Links
              </h4>
              <ul className="flex flex-col gap-2.5 text-sm">
                {footerLinks.slice(0, 5).map((item, i) => (
                  <li key={i}>
                    <Link
                      href={item.link}
                      className="text-primary-fg/80 hover:text-primary-fg transition-colors hover:underline"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Customer Care */}
            <div>
              <h4 className="text-base font-bold uppercase tracking-wider mb-4 border-b border-primary-fg/20 pb-2">
                Customer Care
              </h4>
              <ul className="flex flex-col gap-2.5 text-sm">
                {footerLinks.slice(5).map((item, i) => (
                  <li key={i}>
                    <Link
                      href={item.link}
                      className="text-primary-fg/80 hover:text-primary-fg transition-colors hover:underline"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: Newsletter & Social */}
            <div className="flex flex-col gap-4">
              <h4 className="text-base font-bold uppercase tracking-wider border-b border-primary-fg/20 pb-2">
                Stay Connected
              </h4>
              <p className="text-primary-fg/80 text-sm">
                Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
              </p>

              <div className="flex items-center gap-3 mt-2">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-primary-hover p-2.5 rounded-full border border-primary-fg/30 text-primary-fg hover:bg-primary-fg hover:text-primary transition-colors"
                  aria-label="Facebook"
                >
                  <FaFacebook size={16} />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-primary-hover p-2.5 rounded-full border border-primary-fg/30 text-primary-fg hover:bg-primary-fg hover:text-primary transition-colors"
                  aria-label="Instagram"
                >
                  <InstagramOutlined style={{ fontSize: "16px" }} />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-primary-hover p-2.5 rounded-full border border-primary-fg/30 text-primary-fg hover:bg-primary-fg hover:text-primary transition-colors"
                  aria-label="Twitter"
                >
                  <FaXTwitter size={16} />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-primary-hover p-2.5 rounded-full border border-primary-fg/30 text-primary-fg hover:bg-primary-fg hover:text-primary transition-colors"
                  aria-label="YouTube"
                >
                  <FaYoutube size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-secondary text-secondary-fg py-4 text-xs">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-3 text-secondary-fg/80">
          <p>© {new Date().getFullYear()} Zanass Clothing. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/terms" className="hover:text-secondary-fg hover:underline">
              Terms of Service
            </Link>
            <Link href="/privacy" className="hover:text-secondary-fg hover:underline">
              Privacy Policy
            </Link>
            <Link href="/cookies" className="hover:text-secondary-fg hover:underline">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
