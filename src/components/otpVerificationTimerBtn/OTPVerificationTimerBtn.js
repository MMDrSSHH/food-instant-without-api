"use client";

import React, { useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";

function OTPVerificationTimerBtn({ expiresAt, onResend }) {
  const { minutes, seconds, restart } = useTimer({
    expiryTimestamp: expiresAt,
    onExpire: () => setIsExpired(true),
  });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    setIsExpired(false);
    restart(expiresAt);
  }, [expiresAt]);

  return (
    <>
      {isExpired ? (
        <button
          type="button"
          className="px-[12px] py-[6px] border-2 border-primary text-primary text-[12px] font-bold rounded-[10px]"
          onClick={onResend}
        >
          ارسال کد
        </button>
      ) : (
        <span className="text-gray text-[12px]">
          {minutes < 10 ? `0${minutes}` : minutes}:
          {seconds < 10 ? `0${seconds}` : seconds}
        </span>
      )}
    </>
  );
}

export default OTPVerificationTimerBtn;
