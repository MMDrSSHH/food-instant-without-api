"use client";
import React, { useEffect, useState } from "react";
import CheckoutNewAddressModal from "./CheckoutNewAddressModal";
import useResponsive from "@/hooks/useResponsive";
import CheckoutNewAddressDrawer from "./CheckoutNewAddressDrawer";
import { ErrorCode, getApiRoute } from "@/utils/constants";
import { toast } from "react-toastify";
import { number, object, string } from "yup";
import { flatYupValidationError } from "@/utils/flatYupValidationError";
import { getAccessToken } from "@/utils/auth";

function CheckoutNewAddressPopup({ open, onClose, onSubmit }) {
  const { isExtraLarge } = useResponsive();
  const [zones, setZones] = useState([]);

  const fetchZones = async () => {
    try {
      const res = await fetch(`${getApiRoute()}/zones`, {
        cache: "no-store",
      });

      if (res.ok) {
        const data = await res.json();
        setZones(data);
      }
    } catch (error) {
      // error
    }
  };

  const addressValidation = async (address) => {
    const addressSchema = object({
      zoneId: number().required("منطقه خود را انتخاب کنید."),
      addressText: string()
        .min(3, "آدرس باید حداقل شامل 3 کاراکتر باشد.")
        .max(100, "آدرس نباید شامل بیش از 100 کاراکتر باشد.")
        .required("آدرس خود را تعیین کنید."),
    });

    const validatedAddress = await addressSchema.validate(address, {
      abortEarly: false,
    });

    return validatedAddress;
  };

  const submitAddress = async (zone, address) => {
    try {
      await getAccessToken();
      const addressBody = {
        zoneId: zone?.id,
        addressText: address,
      };

      try {
        await addressValidation(addressBody);
      } catch (error) {
        const errorObject = flatYupValidationError(error);
        for (let key in errorObject) {
          toast.error(errorObject[key]);
        }
        return;
      }

      const headers = new Headers();
      headers.set("Content-Type", "application/json");
      const res = await fetch(`${getApiRoute()}/addresses`, {
        credentials: "include",
        headers,
        body: JSON.stringify(addressBody),
        method: "POST",
      });

      if (res.ok) {
        onSubmit();
        onClose();
      } else {
        const errorResponse = await res.json();
        if (errorResponse.errorCode === ErrorCode.LimitExceeded) {
          toast.error(
            `نمی‌توانید بیشتر از ${errorResponse.value} آدرس ثبت کنید!`
          );
        }
      }
    } catch (error) {
      // error
    }
  };

  useEffect(() => {
    if (open) {
      fetchZones();
    }
  }, [open]);

  return (
    <>
      {isExtraLarge ? (
        <CheckoutNewAddressModal
          open={open}
          onClose={onClose}
          zones={zones}
          onSubmit={submitAddress}
        />
      ) : (
        <CheckoutNewAddressDrawer
          open={open}
          onClose={onClose}
          zones={zones}
          onSubmit={submitAddress}
        />
      )}
    </>
  );
}

export default CheckoutNewAddressPopup;
