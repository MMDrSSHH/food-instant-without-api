"use client";
import React from "react";
import InfoItem from "../infoItem/InfoItem";

function AddressCard({ address, onDelete, onEdit }) {
  return (
    <>
      <div className="hidden sm:flex *:text-gray border-b border-gray/50 px-[12px] *:px-[4px] *:text-[14px] *:py-[12px]">
        <div className="flex-1">{address.index + 1}</div>
        <div className="flex-[2]">{address.zoneTitle}</div>
        <div className="flex-[6]">{address.address}</div>
        <div className="flex flex-1 justify-end gap-[8px] *:px-[8px] *:py-[4px] *:rounded-[10px] *:text-[10px] *:font-bold">
          <button className="danger" onClick={(e) => onDelete(address, e)}>
            حذف
          </button>
          <button className="info" onClick={(e) => onEdit(address, e)}>
            ویرایش
          </button>
        </div>
      </div>

      <div className="sm:hidden p-[16px] border border-gray/50 rounded-[10px] mb-[12px]">
        <div className="flex justify-between items-center mb-[12px]">
          <span className="text-[14px] text-gray"># {address.index + 1}</span>
          <div className="flex justify-end gap-[8px] *:px-[8px] *:py-[4px] *:rounded-[10px] *:text-[10px] *:font-bold">
            <button className="danger" onClick={(e) => onDelete(address, e)}>
              حذف
            </button>
            <button className="info" onClick={(e) => onEdit(address, e)}>
              ویرایش
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-[12px]">
          <InfoItem name="منطقه:" value={address.zoneTitle} />
          <InfoItem name="آدرس:" value={address.address} vertical fullWidth />
        </div>
      </div>
    </>
  );
}

export default AddressCard;
