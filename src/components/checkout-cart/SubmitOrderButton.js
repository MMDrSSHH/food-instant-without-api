"use client";

function SubmitOrderButton({ onSubmit }) {
  return (
    <div className={`xl:hidden z-10`}>
      <div className="h-[70px] w-full transition-transform bg-white flex items-center shadow-md rounded-t-[12px] fixed bottom-0 right-0">
        <div className="gap-[12px] w-[90%] mx-auto items-center justify-between">
          <button
            onClick={onSubmit}
            className="h-[50px] w-full bg-primary text-onPrimary rounded-[10px]"
          >
            ثبت سفارش
          </button>
        </div>
      </div>
    </div>
  );
}

export default SubmitOrderButton;
