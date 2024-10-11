"use client";

import { forwardRef } from "react";

const Checkbox = forwardRef(function Checkbox(props, ref) {
  return (
    <input
      ref={ref}
      checked={props.checked}
      onChange={props.onChange}
      type="checkbox"
      className="accent-gray cursor-pointer focus:outline outline-gray outline-1 outline-offset-2 inline-block w-[20px] aspect-square"
      {...props}
    />
  );
});

export default Checkbox;
