import MenuCarousel from "@/components/carousel/MenuCarousel";
import MenuCategory from "@/components/carousel/MenuCategory";
const MenuCartDrawer = dynamic(
  () => import("@/components/menu-cart/MenuCartDrawer"),
  { ssr: false }
);
import MenuFilter from "@/components/menu-filter/MenuFilter";
import MenuFoods from "@/components/menu-list/MenuFoods";
import { getApiRoute } from "@/utils/constants";
import dynamic from "next/dynamic";

// const fetchMenuFoods = async () => {
//   const menuRes = await fetch(`${getApiRoute()}/foods/get-menu`, {
//     next: {
//       revalidate: 3600,
//     },
//   });

//   return menuRes.json();
// };

// const fetchBanners = async () => {
//   const bannersRes = await fetch(`${getApiRoute()}/banners`, {
//     next: {
//       revalidate: 600,
//     },
//   });

//   return bannersRes.json();
// };

export default async function Home() {
  // const [menuFoods, banners] = await Promise.all([
  //   fetchMenuFoods(),
  //   fetchBanners(),
  // ]);

  const banners = [];
  const menuFoods = [
    {
      id: 2,
      name: "پیتزا",
      foods: [
        {
          id: 3,
          name: "رست بیف",
          price: 3200000,
          image: "foods\\3-رست بیف.jpg",
        },
        {
          id: 4,
          name: "پپرونی",
          price: 2800000,
          image: "foods\\4-پپرونی.jpg",
        },
        {
          id: 5,
          name: "چیلی",
          price: 2500000,
          image: "foods\\5-چیلی.jpg",
        },
        {
          id: 6,
          name: "قارچ و گوشت",
          price: 3500000,
          image: "foods\\6-قارچ و گوشت.jpg",
        },
        {
          id: 14,
          name: "ایتالیایی",
          price: 5400000,
          image: "foods\\14-ایتالیایی.webp",
        },
      ],
      icon: "categories\\2-پیتزا.svg",
    },
    {
      id: 3,
      name: "ساندویچ",
      foods: [
        {
          id: 7,
          name: "سوسیس بندری",
          price: 700000,
          image: "foods\\7-سوسیس بندری.jpg",
        },
        {
          id: 8,
          name: "همبرگر مخصوص",
          price: 850000,
          image: "foods\\8-همبرگر مخصوص.jpg",
        },
      ],
      icon: "categories\\3-ساندویچ.svg",
    },
    {
      id: 4,
      name: "نوشیدنی",
      foods: [
        {
          id: 9,
          name: "نوشابه نارنجی خانواده",
          price: 250000,
          image: "foods\\9-نوشابه نارنجی خانواده.webp",
        },
      ],
      icon: "categories\\4-نوشیدنی.svg",
    },
    {
      id: 5,
      name: "سیب زمینی",
      foods: [
        {
          id: 15,
          name: "فرنچ فرایز",
          price: 800000,
          image: "foods\\15-فرنچ فرایز.webp",
        },
      ],
      icon: null,
    },
  ];

  return (
    <>
      <div className="w-[90%] mx-auto mb-[120px]">
        <main>
          <MenuCarousel banners={banners} />
          <MenuCategory categories={menuFoods} />
          <MenuFilter />
          <MenuFoods foods={menuFoods} />
        </main>
        <MenuCartDrawer />
      </div>
    </>
  );
}
