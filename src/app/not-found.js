import Image from "next/image";
import Link from "next/link";

function NotFoundPage() {
  return (
    <div className="w-[90%] mx-auto min-h-screen flex justify-center items-center">
      <div className="flex flex-col w-full items-center">
        <div className="relative w-full h-[500px] md:h-[600px]">
          <Image src="/assets/images/404-error.svg" alt="404 not found" fill />
        </div>
        <p className="text-gray text-[22px] md:text-[28px] mb-[12px]">
          صفحه‌ی موردنظر یافت نشد!
        </p>
        <Link
          href="/"
          replace
          className="px-[12px] py-[6px] bg-primary text-onPrimary text-[18px] rounded-[10px] w-fit"
        >
          بازگشت به منو
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
