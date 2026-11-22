import ScrollToTopButton from "@/components/ui/ScrollToTopButton/ScrollToTopButton";
import { NextUiProvider } from "@/lib/providers/NextUIProvider";
import ReduxProvider from "@/redux/ReduxProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

import { ConfigProvider } from "antd";
import "antd/dist/reset.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Zanass Clothing — Women's Ethnic Wear",
  description:
    "Shop premium women's ethnic wear, three-piece and two-piece sets online at Zanass.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head></head>
      <body
        suppressHydrationWarning={true}
        className={`${inter.variable} antialiased bg-background text-content`}
      >
        <NextUiProvider>
          <ReduxProvider>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#7F3834",
                  colorInfo: "#7F3834",
                  colorSuccess: "#5CB85C",
                  colorWarning: "#F0AD4E",
                  colorError: "#D9534F",

                  colorTextBase: "#242424",
                  colorBgBase: "#FFFFFF",
                  borderRadius: 2,
                  fontSize: 15,
                  lineHeight: 1.6,
                  controlHeight: 40,
                },
                components: {
                  Button: {
                    colorPrimary: "#7F3834",
                    colorPrimaryHover: "#6B2F2B",
                    colorPrimaryActive: "#572522",

                    colorSuccess: "#5CB85C",
                    colorSuccessHover: "#4CAF50",
                    colorSuccessActive: "#388E3C",

                    colorWarning: "#F0AD4E",
                    colorWarningHover: "#E09B3D",
                    colorWarningActive: "#D48806",

                    colorError: "#D9534F",
                    colorErrorHover: "#C9423E",
                    colorErrorActive: "#B5322E",
                  },
                },
              }}
            >
              <div className="min-h-screen text-content max-w-[100vw] overflow-x-hidden">
                {children}
              </div>
              <ScrollToTopButton />
              <Toaster />
            </ConfigProvider>
          </ReduxProvider>
        </NextUiProvider>
      </body>
    </html>
  );
}
