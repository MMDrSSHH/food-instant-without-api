"use client";

import React, { useEffect, useRef } from "react";

function Accordion({ open, children }) {
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);

  const openAccordion = () => {
    wrapperRef.current.style.maxHeight = `${contentRef.current.scrollHeight}px`;
    wrapperRef.current.style.opacity = 1;
  };

  const closeAccordion = () => {
    wrapperRef.current.style.maxHeight = null;
    wrapperRef.current.style.opacity = null;
  };

  useEffect(() => {
    try {
      if (wrapperRef.current) {
        if (open) openAccordion();
        else closeAccordion();
      }
    } catch (error) {
      // Error
    }
  }, [open]);
  return (
    <div
      ref={wrapperRef}
      className="max-h-0 transition-[max-height,opacity] opacity-0 duration-300 overflow-hidden"
    >
      {/* content */}
      <div ref={contentRef}>{children}</div>
    </div>
  );
}

export default Accordion;
