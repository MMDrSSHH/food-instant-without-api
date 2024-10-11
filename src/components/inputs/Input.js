"use client";
import React, { Children, forwardRef, useState } from "react";
import EyeOpenIcon from "../svgs/EyeOpenIcon";
import EyeCloseIcon from "../svgs/EyeCloseIcon";

const Input = forwardRef(function Input(
  {
    value,
    onChange,
    label,
    placeholder,
    password = false,
    showEyeToggle = false,
    children,
  },
  ref
) {
  const [show, setShow] = useState(false);
  return (
    <div>
      {label && (
        <label className="py-[2px] px-[10px] bg-secondary text-black rounded-full">
          {label}
        </label>
      )}
      {/* Input text box */}
      <div className="border-b-2 flex items-center border-primary/60 transition-border px-[10px] pb-[6px] py-[10px] h-[50px] has-[:focus]:border-primary">
        <input
          ref={ref}
          type={password && !show ? "password" : "text"}
          className="outline-none border-none text-gray w-full placeholder:text-gray/70"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange && onChange(e.target.value, e)}
        />
        <div className="flex gap-[6px]">{children}</div>
        {showEyeToggle && (
          <button
            type="button"
            className="p-1"
            onClick={() => setShow((prev) => !prev)}
          >
            {show ? (
              <EyeOpenIcon className="fill-gray w-[24px]" />
            ) : (
              <EyeCloseIcon className="fill-gray w-[24px]" />
            )}
          </button>
        )}
      </div>
    </div>
  );
});

export default Input;
