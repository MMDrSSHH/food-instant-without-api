import React from "react";
import Checkbox from "../inputs/Checkbox";

function OrderAddressCard({ address, selected, onSelect }) {
  return (
    <button
      className="p-[10px] border border-gray/50 rounded-[8px] flex justify-between items-center"
      onClick={() => onSelect(address)}
    >
      <div className="flex flex-col items-start gap-[8px] w-full">
        <span className="inline-block bg-secondary rounded-full py-[2px] px-[12px] text-gray text-[14px]">
          {address.zoneTitle}
        </span>
        <p className="text-gray text-[14px]">{address.address}</p>
      </div>
      <div>
        <Checkbox onChange={() => onSelect(address)} checked={selected?.id === address.id} />
      </div>
    </button>
  );
}

export default OrderAddressCard;
