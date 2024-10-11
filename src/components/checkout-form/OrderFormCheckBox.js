import React from "react";
import Checkbox from "../inputs/Checkbox";

function CheckoutFormCheckBox({ name, checked, onChange, label }) {
  return (
    <div className="flex justify-between">
      <label className="text-[14px] text-gray" htmlFor={name}>
        {label}
      </label>
      <Checkbox checked={checked} onChange={onChange} id={name} />
    </div>
  );
}

export default CheckoutFormCheckBox;
