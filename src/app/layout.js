import "./globals.css";
import localFont from "next/font/local";
import StoreProvider from "./StoreProvider";
import { ToastContainer } from "react-toastify";
import "react-loading-skeleton/dist/skeleton.css";
import "react-toastify/dist/ReactToastify.css";

const iranSansFont = localFont({
  src: [
    {
      path: "../../public/assets/fonts/iranSans/Woff2/IRANSansXFaNum-Black.woff2",
      weight: "700",
    },
    {
      path: "../../public/assets/fonts/iranSans/Woff2/IRANSansXFaNum-Light.woff2",
      weight: "200",
    },
    {
      path: "../../public/assets/fonts/iranSans/Woff2/IRANSansXFaNum-Regular.woff2",
      weight: "400",
    },
    {
      path: "../../public/assets/fonts/iranSans/Woff2/IRANSansXFaNum-ExtraBold.woff2",
      weight: "900",
    },
  ],
});

export const metadata = {
  title: "Food Instant",
  description: "اپلیکیشن سفارش آنلاین غذا",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className={iranSansFont.className}>
        <StoreProvider>{children}</StoreProvider>
        <ToastContainer
          bodyClassName={`${iranSansFont.className} text-[12px] font-bold`}
          rtl
        />
      </body>
    </html>
  );
}
