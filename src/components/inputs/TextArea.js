"use client";
import React, { forwardRef, useState } from "react";
import EyeOpenIcon from "../svgs/EyeOpenIcon";
import EyeCloseIcon from "../svgs/EyeCloseIcon";

const TextArea = forwardRef(function TextArea(
  { value, onChange, label, placeholder, rows = 3 },
  ref
) {
  return (
    <div>
      {label && (
        <label className="py-[2px] px-[10px] bg-secondary text-black rounded-full">
          {label}
        </label>
      )}
      {/* Input text box */}
      <div className="border-b-2 flex items-center border-primary/60 transition-border px-[10px] pb-[6px] py-[10px] has-[:focus]:border-primary">
        <textarea
          rows={rows}
          ref={ref}
          className="outline-none border-none text-gray w-full placeholder:text-gray/70 resize-none"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange && onChange(e.target.value, e)}
        />
      </div>
    </div>
  );
});

export default TextArea;
