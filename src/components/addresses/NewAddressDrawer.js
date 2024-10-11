"use client";

import React, { useState } from "react";
import CustomDrawer from "../drawer/CustomDrawer";
import CrossXIcon from "../svgs/CrossXIcon";
import TextArea from "../inputs/TextArea";
import Select from "../inputs/Select";

function NewAddressDrawer({ open, onClose, zones = [], onSubmit }) {
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
    <CustomDrawer
      open={open}
      onClose={closeHandler}
      className="min-h-[400px] max-h-screen h-1/2"
    >
      <div className="h-full">
        <div className="h-[70px] w-full transition-transform bg-white flex items-center rounded-t-[12px]">
          <div className="flex gap-[12px] w-[90%] mx-auto items-center justify-between">
            <button
              onClick={submitHandler}
              className="flex-1 h-[50px] bg-primary text-onPrimary rounded-[10px]"
            >
              ثبت آدرس
            </button>
            <button
              onClick={closeHandler}
              className="w-[50px] h-[50px] border-2 border-primary rounded-full flex justify-center items-center"
            >
              <CrossXIcon className="w-[14px] fill-primary" />
            </button>
          </div>
        </div>

        <div className="py-[12px] flex flex-col gap-[24px] h-[calc(100%-70px)] w-[90%] mx-auto">
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
      </div>
    </CustomDrawer>
  );
}

export default NewAddressDrawer;
