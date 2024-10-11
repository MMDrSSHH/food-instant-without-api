import React from "react";
import { Drawer } from "vaul";

function CustomDrawer(props) {
  return (
    <Drawer.Root open={props.open} onClose={props.onClose}>
      <Drawer.Portal>
        <Drawer.Title />
        <Drawer.Content
          data-vaul-no-drag
          draggable={false}
          className={`bg-white z-[11] fixed bottom-0 left-0 right-0 rounded-t-[10px] ${props.className}`}
        >
          {props.children}
        </Drawer.Content>
        <Drawer.Overlay
          className="fixed inset-0 bg-black/40 z-10"
          onClick={props.onClose}
        />
      </Drawer.Portal>
    </Drawer.Root>
  );
}

export default CustomDrawer;
