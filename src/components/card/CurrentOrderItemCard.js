import { getStaticRoute } from "@/utils/constants";
import { formatCurrency } from "@/utils/formatters";
import Image from "next/image";

function CurrentOrderItemCard({ item }) {
  return (
    <div className="rounded-[6px] border border-gray/50 p-[10px] flex justify-between">
      {/* Right */}
      <div className="flex items-center gap-[24px]">
        <Image
          src={`${getStaticRoute()}/${item.image}`}
          alt={item.name}
          width={120}
          height={120}
          className="h-[120px] object-fill rounded-[10px] hidden md:block"
        />
        <p className="text-[16px] md:text-[18px] font-bold text-gray">
          {item.name}
        </p>
      </div>
      {/* Left */}
      <div className="flex gap-[10px] items-center">
        <span className="text-[12px] text-gray">(x{item.count})</span>
        <span className="text-gray font-bold text-[16px] md:text-[18px] min-w-[110px] text-left">
          {formatCurrency(item.price)}
          <sup className="font-normal mr-[4px] text-[14px]">ریال</sup>
        </span>
      </div>
    </div>
  );
}

export default CurrentOrderItemCard;
