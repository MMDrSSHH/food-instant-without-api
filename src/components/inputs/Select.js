"use client";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import React, { forwardRef, Fragment } from "react";
import ChevronUpDownIcon from "../svgs/ChevronUpDownIcon";

/**
 *
 * @param {value, onChange, valueName, itemKey, renderItem, placeholder, renderValue} props
 */
const Select = forwardRef(function Select(props, ref) {
  return (
    <Listbox value={props.value} onChange={props.onChange} ref={ref}>
      <div className="relative">
        {props.label && (
          <label className="py-[2px] px-[10px] bg-secondary text-black rounded-full">
            {props.label}
          </label>
        )}
        <ListboxButton className="relative w-full border-b-2 border-primary/60 cursor-default bg-white py-2 pr-3 pl-10 text-right focus:border-primary sm:text-sm">
          {props.value ? (
            <span className="block truncate">
              {props.renderValue
                ? props.renderValue(props.value)
                : props.value[props.valueName]}
            </span>
          ) : (
            <span className="block text-[16px] text-gray/70 truncate">
              {props.placeholder ?? "انتخاب کنید"}
            </span>
          )}
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5 stroke-gray"
              aria-hidden="true"
            />
          </span>
        </ListboxButton>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <ListboxOptions className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base border border-gray/40 focus:outline-none sm:text-sm">
            {props.data?.map((item, index, array) => (
              <ListboxOption
                key={item[props.itemKey]}
                className={({ selected }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 hover:bg-onPrimary hover:text-primary ${
                    selected ? "bg-onPrimary text-primary" : "text-gray"
                  }`
                }
                value={item}
              >
                {({ selected }) => (
                  <>
                    {props.renderItem(item, selected, index, array)}
                    {/* {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null} */}
                  </>
                )}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Transition>
      </div>
    </Listbox>
  );
});

export default Select;
