"use client";

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import React from "react";

function CustomModal(props) {
  return (
    <Dialog
      open={props.open}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={props.onClose}
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/50 duration-200 ease-out data-[closed]:opacity-0"
      />
      <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className={`w-fit rounded-[10px] bg-white p-6 duration-200 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 ${props.className}`}
          >
            {props.children}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default CustomModal;
