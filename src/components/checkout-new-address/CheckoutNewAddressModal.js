"use client";

import React, { useState } from "react";
import CustomModal from "../modal/CustomModal";
import CrossXIcon from "../svgs/CrossXIcon";
import Select from "../inputs/Select";
import TextArea from "../inputs/TextArea";
import { ErrorCode, getApiRoute } from "@/utils/constants";
import { toast } from "react-toastify";

function CheckoutNewAddressModal({ open, onClose, zones = [], onSubmit }) {
  const [zone, setZone] = useState(null);
  const [address, setAddress] = useState("");
  const [pending, setIsPending] = useState(false);

  const closeHandler = () => {
    setZone(null);
    setAddress("");
    onClose();
  };

  const submitHandler = () => {
    onSubmit(zone, address);
  };

  return (
    <CustomModal open={open} onClose={closeHandler}>
      <div className="w-[700px] divide-y divide-gray/20">
        <div className="flex justify-between items-center pb-[12px]">
          <h4 className="text-gray text-[18px]">آدرس جدید</h4>
          <button onClick={closeHandler}>
            <CrossXIcon className="fill-gray w-[14px]" />
          </button>
        </div>

        {/* Body */}
        <div className="py-[12px] flex flex-col gap-[24px]">
          <Select
            label="منطقه"
            value={zone}
            data={zones}
            onChange={setZone}
            valueName="title"
            itemKey="id"
            placeholder="منطقه خود را انتخاب کنید..."
            renderItem={(item, selected) => (
              <div
                key={item.id}
                className={`text-gray flex flex-col gap-[2px]`}
              >
                <span className="text-[14px] font-bold">{item.title}</span>
                {item.description && (
                  <span className="text-[12px]">{item.description}</span>
                )}
              </div>
            )}
            renderValue={(value) => (
              <div className="text-gray flex flex-col gap-[2px]">
                <span className="text-[14px] font-bold">{value.title}</span>
                {value.description && (
                  <span className="text-[12px]">{value.description}</span>
                )}
              </div>
            )}
          />
          <TextArea
            value={address}
            onChange={setAddress}
            placeholder="آدرس خود را وارد کنید..."
            label="آدرس"
          />
        </div>

        {/* footer */}
        <div className="flex gap-[6px] items-center justify-end pt-[12px]">
          <button
            className="px-[12px] py-[6px] border-2 border-primary text-onPrimary bg-primary rounded-[10px]"
            onClick={submitHandler}
          >
            تایید
          </button>
          <button
            className="px-[12px] py-[6px] border-2 border-primary text-primary rounded-[10px]"
            onClick={closeHandler}
          >
            انصراف
          </button>
        </div>
      </div>
    </CustomModal>
  );
}

export default CheckoutNewAddressModal;
