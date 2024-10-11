"use client";

import CustomModal from "./CustomModal";

function DeleteModal({ open, onClose, onDelete, title, body }) {
  return (
    <CustomModal open={open} onClose={onClose} className="w-full sm:w-[400px]">
      <div className="text-gray font-bold text-[16px] pb-[12px] border-b border-gray/50">
        {title}
      </div>
      <div className="text-gray text-[14px] mt-[24px] mb-[12px]">{body}</div>
      <div className="flex gap-[6px] justify-end">
        <button
          className="py-[6px] px-[12px] text-[14px] font-bold text-gray rounded-[6px]"
          onClick={onClose}
        >
          لغو
        </button>
        <button
          className="py-[6px] px-[12px] text-[14px] font-bold danger rounded-[6px]"
          onClick={onDelete}
        >
          حذف
        </button>
      </div>
    </CustomModal>
  );
}

export default DeleteModal;
