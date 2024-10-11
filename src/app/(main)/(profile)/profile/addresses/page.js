"use client";

import AddressCard from "@/components/addresses/AddressCard";
import DeleteModal from "@/components/modal/DeleteModal";
import SectionHeader from "@/components/section-header/SectionHeader";
import { getAccessToken } from "@/utils/auth";
import { getApiRoute } from "@/utils/constants";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import dynamic from "next/dynamic";
const NewAddressPopup = dynamic(
  () => import("@/components/addresses/NewAddressPopup"),
  { ssr: false }
);

function AddressesPage() {
  //#region Hooks
  const [addresses, setAddresses] = useState([]);
  const [addressOnDelete, setAddressOnDelete] = useState(null);
  const [showAddressDeleteModal, setShowAddressDeleteModal] = useState(false);
  const [addressOnEdit, setAddressOnEdit] = useState(null);
  const [showAddressEditModal, setShowAddressEditModal] = useState(false);
  const [showNewAddressPopup, setShowNewAddressPopup] = useState(false);
  //#endregion

  //#region Methods
  const getAddresses = async () => {
    try {
      await getAccessToken();

      const res = await fetch(`${getApiRoute()}/addresses/per-user`, {
        cache: "no-store",
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setAddresses(data);
      }
    } catch (error) {
      toast.error("خطا در دریافت آدرس ‌ها رخ داده!");
      // error
    }
  };

  const deleteAddress = async () => {
    let toastId;
    try {
      toastId = toast.loading("در حال حذف آدرس ...");
      await getAccessToken();

      const res = await fetch(
        `${getApiRoute()}/addresses/${addressOnDelete.id}`,
        {
          credentials: "include",
          method: "DELETE",
        }
      );

      if (res.ok) {
        toast.update(toastId, {
          render: "آدرس با موفقیت حذف شد.",
          isLoading: false,
          type: "success",
          autoClose: null,
          closeButton: null,
        });
        getAddresses();
      } else {
        if (res.status === 404) {
          toast.update(toastId, {
            render: "آدرس موردنظر یاقت نشد!",
            isLoading: false,
            type: "error",
            autoClose: null,
            closeButton: null,
          });
        } else {
          toast.update(toastId, {
            render: "خطا در حذف آدرس رخ داده!",
            isLoading: false,
            type: "error",
            autoClose: null,
            closeButton: null,
          });
        }
      }
    } catch (error) {
      toast.update(toastId, {
        render: "خطا در حذف آدرس رخ داده!",
        isLoading: false,
        type: "error",
        autoClose: null,
        closeButton: null,
      });
    } finally {
      closeDeleteAddressModal();
    }
  };

  const openDeleteAddressModal = (address) => {
    setShowAddressDeleteModal(true);
    setAddressOnDelete(address);
  };

  const closeDeleteAddressModal = () => {
    setShowAddressDeleteModal(false);
    setAddressOnDelete(null);
  };

  const openNewAddressPopup = () => {
    setShowNewAddressPopup(true);
  };

  const closeNewAddressPopup = () => {
    setShowNewAddressPopup(false);
  };

  //#endregion

  //#region Effects
  useEffect(() => {
    getAddresses();
  }, []);
  //#endregion
  return (
    <div>
      <SectionHeader>آدرس ها</SectionHeader>
      <div className="mt-[40px]">
        <div className="w-full">
          <div className="hidden sm:flex text-right *:text-gray *:font-bold px-[12px] *:px-[4px] *:text-[16px]">
            <div className="flex-1">#</div>
            <div className="flex-[2]">منطقه</div>
            <div className="flex-[6]">آدرس</div>
            <div className="flex-1 text-left">
              <button
                onClick={openNewAddressPopup}
                className="border-2 border-primary text-primary px-[12px] py-[6px] text-[14px] rounded-[12px] text-nowrap"
              >
                افزودن آدرس
              </button>
            </div>
          </div>
          <div className="sm:hidden text-left">
            <button
              onClick={openNewAddressPopup}
              className="border-2 border-primary text-primary px-[12px] py-[6px] text-[14px] rounded-[12px] text-nowrap"
            >
              افزودن آدرس
            </button>
          </div>
          <div className="mt-[6px]">
            {addresses.map((a, index) => (
              <AddressCard
                key={a.id}
                address={{ ...a, index }}
                onDelete={openDeleteAddressModal}
              />
            ))}
          </div>
        </div>
      </div>
      <DeleteModal
        body={"آیا تمایل به حذف آدرس خود را دارید؟"}
        title={"حذف آدرس"}
        onClose={closeDeleteAddressModal}
        onDelete={deleteAddress}
        open={showAddressDeleteModal}
      />
      <NewAddressPopup
        onClose={closeNewAddressPopup}
        open={showNewAddressPopup}
        onSubmit={() => {
          closeNewAddressPopup();
          getAddresses();
        }}
      />
    </div>
  );
}

export default AddressesPage;
